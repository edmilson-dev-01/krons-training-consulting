'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/** True while the page is scrolling down past `threshold`; false near the top or scrolling up. */
export function useScrollDirection(threshold = 80) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setHidden(currentY > threshold && currentY > lastScrollY.current);
    lastScrollY.current = currentY;
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return hidden;
}
