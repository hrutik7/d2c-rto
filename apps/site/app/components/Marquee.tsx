/**
 * Infinite ticker. The track holds the list twice and slides exactly -50%, so
 * the seam lands on an identical frame and the loop is invisible.
 */
export function Marquee({
  items,
  speed = 46,
  reverse = false,
  big = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  big?: boolean;
}) {
  const run = (key: string) => (
    <div className="mq-item" key={key}>
      {items.map((w, i) => (
        <span key={`${key}-${i}`} style={{ display: 'contents' }}>
          <span className={`mq-word ${big ? 'big' : ''}`}>{w}</span>
          <span className="mq-pip">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${reverse ? 'rev' : ''}`}>
      <div className="marquee-track" style={{ ['--speed' as any]: `${speed}s` }}>
        {run('a')}
        {run('b')}
      </div>
    </div>
  );
}
