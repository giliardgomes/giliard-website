import { useEffect, useRef } from "react";

export function useFitText() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "1px";
      const availableWidth = el.clientWidth; // ← uses the element itself, padding already excluded
      let low = 1, high = 1000;

      while (high - low > 0.5) {
        const mid = (low + high) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth <= availableWidth) low = mid;
        else high = mid;
      }

      el.style.fontSize = `${low}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return ref;
}