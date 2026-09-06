# RTO — L1 accuracy layer

Three levels, one story. **L1** camera sizing before purchase, **L2** WhatsApp confirmation
after it, **L3** Hinglish voice call when that goes unanswered — L2 and L3 both fire
*before dispatch*, which is where their economics come from.

---

## Value proposition

The courier cannot name the cause of a return. Eleven reason codes on the manifest, and not
one of them says *ran small* — a size failure comes back filed as `REFUSED_COD`, owned by
checkout, marked rarely savable. So the spend gets budgeted as fraud, freight and address
hygiene, and the pattern never changes.

**We re-cut that spend against the brand's own exchange records.** Across a 45,000-order
corpus, ₹70.0L of RTO resolves to **₹8.5L — 12% — attributable to size charts that run
small**, concentrated in twelve styles. Nothing new is instrumented: the attribution runs on
order history, exchange reasons and size charts the brand already has. No courier
integration, no manifest change, no tagging pass over historical orders.

Then the fix lands where the mistake is actually made. Each style earns a learned centimetre
offset that the size picker applies **before** checkout, with camera measurement behind a
3KB script tag — the model downloads when she taps *Find my size*, never on page render.
What sizing cannot catch, the next two levels do, both *before dispatch* where the economics
are: **L2** WhatsApp confirmation, **L3** a Hinglish voice call when that goes unanswered.

The same join pays out twice: re-cutting on address rather than size surfaces 40 COD
clusters returning at 67% against a 20.6% baseline.

> **In one line:** the RTO line item is not remorse, it is a measurement problem — and the
> answer is already sitting in your returns data.

Numbers above are from the synthetic corpus in `data/`, where styles were deliberately given
a bad size chart so the estimate can be scored against a known answer; the ranking recovers
100% of them, and the attributed total lands under the true injected cost.

---

## The one rule

**The contract freezes at H1.** `packages/core/src/types.ts` and
`packages/db/prisma/schema.prisma` are written first and then left alone. Everyone codes
against them. Changing either means shouting in the group first, because someone else is
already building on it.

With three people and twenty-four hours, integration at H16 is the risk — not the camera.

---

