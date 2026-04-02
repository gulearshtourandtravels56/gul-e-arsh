'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for intersection observer based scroll animations.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

/**
 * Returns an icon for given service/feature icon key
 */
export function getIconForKey(key) {
  const icons = {
    package: '📦',
    hotel: '🏨',
    heart: '💕',
    mountain: '🏔️',
    compass: '🧭',
    car: '🚗',
    map: '🗺️',
    wallet: '💰',
    headset: '🎧',
    users: '👥',
    shield: '🛡️',
    leaf: '🌿',
  };
  return icons[key] || '✨';
}
