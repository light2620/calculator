import { useEffect, useState } from 'react';

const useIntersectionObserver = (elementRef, { threshold = 0.1, root = null, rootMargin = '0%' }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = elementRef?.current; // The element to watch

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state to true if element is in viewport, false otherwise
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    // Start observing the element
    observer.observe(node);

    // Cleanup: stop observing when the component unmounts
    return () => observer.unobserve(node);

  }, [elementRef, threshold, root, rootMargin]);

  return isIntersecting;
};

export default useIntersectionObserver;