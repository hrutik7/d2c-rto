'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Facade player. A bare YouTube <iframe> pulls roughly a megabyte of player
 * script into the hero whether or not anyone presses play, which is the wrong
 * trade for the first thing on the page. So we render the poster frame and
 * only mount the real iframe on click — one image until intent is shown.
 */

/** Best first. Not every upload has every size. */
const POSTERS = ['maxresdefault', 'sddefault', 'hqdefault'];

/** A missing size comes back as this 120x90 grey card — with a 200, so the
 *  status code tells us nothing and the decoded width has to. */
const PLACEHOLDER_W = 120;

export function VideoDemo({
  id,
  title = 'Product demo',
  label,
}: {
  id: string;
  title?: string;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const next = useCallback(() => setStep((n) => Math.min(n + 1, POSTERS.length - 1)), []);

  const check = useCallback(
    (img: HTMLImageElement | null) => {
      if (img && img.complete && img.naturalWidth > 0 && img.naturalWidth <= PLACEHOLDER_W) next();
    },
    [next],
  );

  // A cached poster can finish loading before React hydrates, in which case
  // neither onLoad nor onError ever fires. Re-check whatever already decoded.
  useEffect(() => {
    check(imgRef.current);
  }, [step, check]);

  return (
    <div className="vid">
      {playing ? (
        <iframe
          className="vid-frame"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button className="vid-facade" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}>
          <img
            ref={imgRef}
            // sd and hq are 4:3 with the 16:9 frame letterboxed into them.
            className={`vid-poster ${step > 0 ? 'crop43' : ''}`}
            src={`https://i.ytimg.com/vi/${id}/${POSTERS[step]}.jpg`}
            alt=""
            onError={next}
            onLoad={(e) => check(e.currentTarget)}
          />
          <span className="vid-scrim" />
          <span className="vid-play">
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden>
              <path d="M19 9.27a2 2 0 0 1 0 3.46L3 21.99a2 2 0 0 1-3-1.73V1.74A2 2 0 0 1 3 .01l16 9.26Z" fill="currentColor" />
            </svg>
          </span>
          {label && <span className="vid-label">{label}</span>}
        </button>
      )}
    </div>
  );
}
