'use client';

import type { ReactNode } from 'react';
import { useInView } from '../lib/hooks';

/**
 * Scroll-reveal wrapper. `delay` staggers siblings — 0, 80, 160… reads as one
 * gesture rather than four separate ones.
 */
export function Rise({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  threshold = 0.15,
}: {
  children: ReactNode;
  delay?: number;
  as?: any;
  className?: string;
  threshold?: number;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(threshold);
  return (
    <Tag
      ref={ref}
      className={`rise ${seen ? 'in' : ''} ${className}`}
      style={{ ['--d' as any]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
