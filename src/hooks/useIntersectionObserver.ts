import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit
) => {
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, options]);

  return targetRef;
};
