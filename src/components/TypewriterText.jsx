import React, { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion.js";

// Types `text` out character by character once the element scrolls into
// view (plays once, not on every scroll back into view). The full text
// stays available to screen readers the whole time via aria-label — both
// inner spans are aria-hidden so AT doesn't read a changing string.
//
// Layout: a full, invisible copy of the text reserves the final wrapped
// height up front (normal flow), and the animated partial text is
// absolutely positioned on top of it — so the reveal never shifts
// whatever sits below this component.
export default function TypewriterText({ text, speed = 18, className }) {
  const reducedMotion = usePrefersReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || hasStarted) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver !== "function") {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, hasStarted]);

  useEffect(() => {
    if (reducedMotion || !hasStarted || visibleCount >= text.length) return;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [reducedMotion, hasStarted, visibleCount, text, speed]);

  const isTyping = hasStarted && visibleCount < text.length;

  if (reducedMotion) {
    return (
      <p className={className} aria-label={text}>
        <span aria-hidden="true">{text}</span>
      </p>
    );
  }

  return (
    <p ref={containerRef} className={`relative ${className}`} aria-label={text}>
      {/* Ghost copy: invisible, but in normal flow — reserves the final height */}
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      {/* Visible animated copy, overlaid so it never affects layout height */}
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, visibleCount)}
        {isTyping && (
          <span className="inline-block w-[2px] h-[1em] -mb-[2px] ml-0.5 bg-current align-middle" />
        )}
      </span>
    </p>
  );
}
