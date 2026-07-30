'use client';

import { useEffect } from 'react';

/**
 * Adds `className` to element(s) once they cross the viewport, then stops
 * observing them. `target` is either an array of refs, or `{ root, selector }`
 * to reveal every element matching `selector` inside a container ref.
 */
export function useRevealOnScroll(
  target,
  { className, threshold = 0.2, rootMargin, deps = [] } = {}
) {
  useEffect(() => {
    const elements =
      'root' in target
        ? target.root.current
          ? Array.from(target.root.current.querySelectorAll(target.selector))
          : []
        : target.map((ref) => ref.current).filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
