import React from "react";

// A neural-network circuit shaped like an "A" — apex node, two diagonal
// legs, a crossbar bridge, plus an inner synapse layer connecting the
// apex down into the crossbar. The bottom sub-leaf nodes from the
// original design are still dropped — past this point of detail it turns
// to mush at icon scale (this renders around 24-32px in the nav).
export default function LogoMark({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="110 70 280 340"
      className={`text-blue-600 dark:text-blue-500 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* outer "A" skeleton */}
        <path d="M 250 100 L 140 380" strokeWidth="22" />
        <path d="M 250 100 L 360 380" strokeWidth="22" />
        <path d="M 175 290 L 210 290 L 250 250 L 290 290 L 325 290" strokeWidth="18" />
        {/* inner synapse layer */}
        <path d="M 250 100 L 250 180" strokeWidth="12" strokeDasharray="10 9" opacity="0.75" />
        <path d="M 250 180 L 195 240" strokeWidth="12" opacity="0.7" />
        <path d="M 250 180 L 305 240" strokeWidth="12" opacity="0.7" />
        <path d="M 195 240 L 175 290" strokeWidth="12" opacity="0.7" />
        <path d="M 305 240 L 325 290" strokeWidth="12" opacity="0.7" />
      </g>
      <g fill="currentColor">
        <circle cx="250" cy="100" r="26" />
        <circle cx="140" cy="380" r="22" />
        <circle cx="360" cy="380" r="22" />
        <circle cx="250" cy="250" r="17" />
        <circle cx="175" cy="290" r="14" />
        <circle cx="325" cy="290" r="14" />
        <circle cx="250" cy="180" r="13" opacity="0.9" />
        <circle cx="195" cy="240" r="11" opacity="0.85" />
        <circle cx="305" cy="240" r="11" opacity="0.85" />
      </g>
    </svg>
  );
}
