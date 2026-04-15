'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FiPackage,
  FiHome,
  FiHeart,
  FiMap,
  FiCompass,
  FiTruck,
  FiMapPin,
  FiDollarSign,
  FiHeadphones,
  FiUsers,
  FiShield,
  FiFeather,
} from 'react-icons/fi';

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

export const ICONS = {
  package: FiPackage,
  hotel: FiHome,
  heart: FiHeart,
  mountain: FiMapPin,
  compass: FiCompass,
  car: FiTruck,
  map: FiMap,
  wallet: FiDollarSign,
  headset: FiHeadphones,
  users: FiUsers,
  shield: FiShield,
  leaf: FiFeather,
};

export const getIconForKey = (key) => {
  const IconComponent = ICONS[key];
  if (IconComponent) return <IconComponent />;
  return key || <FiPackage />;
};
