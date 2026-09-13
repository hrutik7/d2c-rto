#!/usr/bin/env bash
#
# Push the heavy static to S3, behind CloudFront.
#
#   ./scripts/cdn-sync.sh                      # sync, then invalidate
#   BUCKET=my-bucket ./scripts/cdn-sync.sh     # override the target
#   ./scripts/cdn-sync.sh --dry-run            # show what would move
#
# What goes up: the MediaPipe wasm runtime and the pose model (38MB together,
# paid by every cold visitor), plus the standalone try-on demo. What does NOT
# go up is widget.js — it derives its iframe origin from its own script tag
# (`new URL(document.currentScript.src).origin`) and then loads `${origin}/embed`,
# so serving it from the CDN points every embed at a URL that does not exist.
# It is 4KB. It stays on the app origin. See the guard at the bottom.
#
# CONTENT TYPES ARE THE WHOLE REASON THIS IS A SCRIPT AND NOT ONE aws s3 sync.
# S3 guesses from the extension and has no entry for .wasm or .task, so both
# land as binary/octet-stream. MediaPipe compiles the wasm with
# instantiateStreaming, which REQUIRES application/wasm and fails with a
# console error most people read as a CORS problem. apps/tryon/serve.py sets
# these same types by hand for the same reason.

set -euo pipefail

# The physisync AWS account. Committed deliberately: an account id is not a
# secret, and hardcoding it is the only thing that reliably stops this script
# from writing into the wrong account. Hritik's laptop also carries admin
# credentials for a company account whose `default` profile would otherwise
# win every time someone forgets --profile. Override only to stand up a second
# environment, and change the committed value if the account ever moves.
EXPECTED_ACCOUNT="${EXPECTED_ACCOUNT:-829742257490}"

BUCKET="${BUCKET:-physisync-cdn-829742257490}"
REGION="${REGION:-ap-south-1}"
DISTRIBUTION_ID="${DISTRIBUTION_ID:-}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MEDIAPIPE="$ROOT/apps/web/public/mediapipe"
TRYON="$ROOT/apps/tryon"

DRY=()
[[ "${1:-}" == "--dry-run" ]] && DRY=(--dryrun) && echo "  (dry run — nothing will be written)"

# Versioned build artifacts that never change in place. A returning visitor
# re-downloads nothing. If the model is ever swapped, change the PATH rather
# than the file, or edge caches will serve the old one for a year.
IMMUTABLE="public,max-age=31536000,immutable"

say() { printf '\n  \033[36m%s\033[0m %s\n' "$1" "$2"; }

# ---------------------------------------------------------------- preflight

command -v aws >/dev/null || { echo "aws cli not found"; exit 1; }
[[ -d "$MEDIAPIPE/wasm" ]] || { echo "missing $MEDIAPIPE/wasm — is the repo checked out fully?"; exit 1; }
[[ -f "$MEDIAPIPE/pose_landmarker_lite.task" ]] || { echo "missing the pose model at $MEDIAPIPE"; exit 1; }

# Which account are we actually pointed at? Checked before ANY write, including
# on --dry-run, because the useful time to find out you are on the wrong
# credentials is the rehearsal, not the run.
ACTUAL_ACCOUNT="$(aws sts get-caller-identity --query Account --output text 2>/dev/null || true)"

if [[ -z "$ACTUAL_ACCOUNT" ]]; then
  echo "could not read AWS identity. Set a profile and try again:"
  echo "    export AWS_PROFILE=physisync-prod"
  exit 1
fi

if [[ "$ACTUAL_ACCOUNT" != "$EXPECTED_ACCOUNT" ]]; then
  printf '\n  \033[31mREFUSING TO WRITE\033[0m\n\n'
  printf '  authenticated as account  %s\n' "$ACTUAL_ACCOUNT"
  printf '  this script targets       %s\n\n' "$EXPECTED_ACCOUNT"
  printf '  Pick the right credentials:\n'
  printf '      export AWS_PROFILE=physisync-prod\n\n'
  printf '  If %s really is the intended target, say so explicitly:\n' "$ACTUAL_ACCOUNT"
  printf '      EXPECTED_ACCOUNT=%s ./scripts/cdn-sync.sh\n\n' "$ACTUAL_ACCOUNT"
  exit 1
fi

printf '\n  \033[2maccount %s · profile %s · %s\033[0m\n' \
  "$ACTUAL_ACCOUNT" "${AWS_PROFILE:-default}" "$REGION"

aws s3api head-bucket --bucket "$BUCKET" >/dev/null 2>&1 || {
  echo "bucket s3://$BUCKET is not reachable. Create it first:"
  echo "    aws s3 mb s3://$BUCKET --region $REGION"
  exit 1
}

# ---------------------------------------------------------------- mediapipe

# Three passes over the same directory, because --content-type applies to every
# object in a sync and cannot be varied per extension. Each pass claims its own
# extensions and excludes the others, so nothing is uploaded twice.

say "wasm" "$MEDIAPIPE/wasm → s3://$BUCKET/mediapipe/wasm"
aws s3 sync "$MEDIAPIPE/wasm" "s3://$BUCKET/mediapipe/wasm" \
  --exclude "*" --include "*.wasm" \
  --content-type "application/wasm" \
  --cache-control "$IMMUTABLE" \
  "${DRY[@]}"

say "glue" "the .js loaders that sit beside the wasm"
aws s3 sync "$MEDIAPIPE/wasm" "s3://$BUCKET/mediapipe/wasm" \
  --exclude "*" --include "*.js" \
  --content-type "application/javascript" \
  --cache-control "$IMMUTABLE" \
  "${DRY[@]}"

say "model" "pose_landmarker_lite.task (5.6MB)"
aws s3 cp "$MEDIAPIPE/pose_landmarker_lite.task" \
  "s3://$BUCKET/mediapipe/pose_landmarker_lite.task" \
  --content-type "application/octet-stream" \
  --cache-control "$IMMUTABLE" \
  "${DRY[@]}"

# ------------------------------------------------------------------- tryon

# The standalone demo. serve.py is a dev convenience; these files are static
# and belong on the edge.
#
# It carries its OWN copy of the wasm runtime and the pose model under vendor/,
# referenced by relative path from index.html, so those need exactly the same
# per-extension content types as apps/web/public/mediapipe above. Uploading
# them in the general pass gives them binary/octet-stream and breaks the demo
# in the same way, just in a directory that is easier to forget.

# Never ship these: a dev server, its self-signed cert, the local cache, the
# test runner and the GLB exporter. NOT_SHIPPED is repeated in every pass
# because --exclude/--include are evaluated per-command, in order — a pass that
# opens with `--exclude "*"` has already forgotten these unless they follow.
NOT_SHIPPED=(
  --exclude ".tryon-cache/*"
  --exclude "test/*"
  --exclude "tools/*"
  --exclude "*.py"
  --exclude "*.pem"
  --exclude "ops-queue.json"
)

say "tryon" "$TRYON → s3://$BUCKET/tryon"
aws s3 sync "$TRYON" "s3://$BUCKET/tryon" \
  "${NOT_SHIPPED[@]}" \
  --exclude "*.wasm" --exclude "*.task" --exclude "*.glb" --exclude "*.mjs" \
  --cache-control "public,max-age=3600" \
  "${DRY[@]}"

# One pass per type that S3 cannot guess. Order inside each: drop everything,
# re-admit the one extension, then re-apply NOT_SHIPPED so vendored test
# fixtures do not sneak back in.
sync_typed() {
  local pattern="$1" ctype="$2"
  aws s3 sync "$TRYON" "s3://$BUCKET/tryon" \
    --exclude "*" --include "$pattern" \
    "${NOT_SHIPPED[@]}" \
    --content-type "$ctype" \
    --cache-control "$IMMUTABLE" \
    "${DRY[@]}"
}

sync_typed "*.wasm" "application/wasm"
sync_typed "*.task" "application/octet-stream"
sync_typed "*.glb"  "model/gltf-binary"
sync_typed "*.mjs"  "application/javascript"

# ------------------------------------------------------------------- guard

# Cheap insurance against someone adding widget.js to a sync above later.
if aws s3 ls "s3://$BUCKET/widget.js" >/dev/null 2>&1; then
  printf '\n  \033[31mWARNING\033[0m widget.js is on the CDN. It computes its iframe\n'
  printf '          origin from its own src, so embeds will load\n'
  printf '          https://cdn.../embed, which does not exist.\n'
  printf '          Remove it:  aws s3 rm s3://%s/widget.js\n' "$BUCKET"
fi

# -------------------------------------------------------------- invalidate

# Only the short-cache tryon files ever need this — the immutable ones are
# path-versioned by definition. Skipped when no distribution is configured,
# which is the case on a first run before CloudFront exists.
if [[ -n "$DISTRIBUTION_ID" && ${#DRY[@]} -eq 0 ]]; then
  say "invalidate" "/tryon/* on $DISTRIBUTION_ID"
  aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/tryon/*" \
    --query 'Invalidation.Id' --output text
else
  printf '\n  \033[2mset DISTRIBUTION_ID to invalidate /tryon/* after a sync\033[0m\n'
fi

printf '\n  done. verify the type that actually matters:\n'
printf '    curl -sI https://cdn.physisync.co.in/mediapipe/wasm/vision_wasm_internal.wasm | grep -i content-type\n'
printf '    expect: application/wasm\n\n'
