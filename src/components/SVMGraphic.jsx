import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

// Margin lines reuse this exact same shape as the boundary and are moved
// into position via CSS transform — that's what makes an animated width
// possible; you can't smoothly animate between two different "d" paths,
// but you can smoothly animate a translateX applied to one shared shape.
const BOUNDARY = "M 180,40 L 220,230";

const BLUE_POINTS = [
  { x: 60, y: 85 },
  { x: 90, y: 145 },
  { x: 50, y: 185 },
  { x: 100, y: 215 },
];
const BLUE_SV = { x: 158, y: 125 };
const BLUE_OUTLIERS = [
  { x: 195, y: 165 }, // in the margin band, still correctly classified
  { x: 225, y: 85 },  // crossed to the wrong side entirely
];

const WHITE_POINTS = [
  { x: 320, y: 75 },
  { x: 290, y: 125 },
  { x: 340, y: 175 },
  { x: 300, y: 205 },
];
const WHITE_SV = { x: 238, y: 125 };

export default function SVMGraphic() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const blueFill = isDark ? "fill-blue-500" : "fill-blue-600";
  const lineColor = isDark ? "text-blue-500" : "text-blue-600";
  const whiteStroke = isDark ? "#3f3f46" : "#111827";
  const titleColor = isDark ? "fill-blue-500" : "fill-blue-600";

  return (
    <svg
      viewBox="0 0 380 245"
      className="w-full max-w-xs h-auto"
      fill="none"
      role="img"
      aria-label="Animated diagram of a support vector machine: a boundary and margin separating two classes, the margin narrowing then widening to its correct width, with support vectors highlighted and two soft-margin outliers shown as tolerated exceptions"
    >
      <style>{`
        @keyframes svmPoints {
          0% { opacity: 0; }
          8% { opacity: 1; }
          90% { opacity: 1; }
          94% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes svmBoundary {
          0%, 8% { stroke-dashoffset: 1; }
          28% { stroke-dashoffset: 0; }
          90% { stroke-dashoffset: 0; }
          94% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 1; }
        }
        /* Margin width story: hidden, reveal at a middling width, narrow
           in further, then widen out to the correct final width. */
        @keyframes svmMarginBlueWidth {
          0%, 28% { opacity: 0; transform: translateX(0); }
          34% { opacity: 1; transform: translateX(-20px); }
          42% { transform: translateX(-10px); }
          54% { transform: translateX(-40px); }
          90% { opacity: 1; transform: translateX(-40px); }
          94% { opacity: 0; }
          100% { opacity: 0; transform: translateX(0); }
        }
        @keyframes svmMarginWhiteWidth {
          0%, 28% { opacity: 0; transform: translateX(0); }
          34% { opacity: 1; transform: translateX(20px); }
          42% { transform: translateX(10px); }
          54% { transform: translateX(40px); }
          90% { opacity: 1; transform: translateX(40px); }
          94% { opacity: 0; }
          100% { opacity: 0; transform: translateX(0); }
        }
        @keyframes svmSVRing {
          0%, 54% { opacity: 0; transform: scale(0.7); }
          64% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; transform: scale(1); }
          94% { opacity: 0; }
          100% { opacity: 0; transform: scale(0.7); }
        }
        @keyframes svmOutlierRing {
          0%, 66% { opacity: 0; transform: scale(0.7); }
          76% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; transform: scale(1); }
          94% { opacity: 0; }
          100% { opacity: 0; transform: scale(0.7); }
        }
        .svm-points { animation: svmPoints 6s ease-in-out infinite; }
        .svm-boundary { animation: svmBoundary 6s ease-in-out infinite; }
        .svm-margin-blue { animation: svmMarginBlueWidth 6s ease-in-out infinite; }
        .svm-margin-white { animation: svmMarginWhiteWidth 6s ease-in-out infinite; }
        .svm-sv-ring { animation: svmSVRing 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .svm-outlier-ring { animation: svmOutlierRing 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .svm-points, .svm-boundary, .svm-margin-blue, .svm-margin-white, .svm-sv-ring, .svm-outlier-ring {
            animation: none !important;
          }
          .svm-points { opacity: 1; }
          .svm-boundary { stroke-dashoffset: 0; }
          .svm-margin-blue { opacity: 1; transform: translateX(-40px); }
          .svm-margin-white { opacity: 1; transform: translateX(40px); }
          .svm-sv-ring, .svm-outlier-ring { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <text
        x={190}
        y={16}
        textAnchor="middle"
        fontSize="12"
        fontWeight={600}
        letterSpacing="0.05em"
        fill="currentColor"
        className={titleColor}
        style={{ textTransform: "uppercase" }}
      >
        Soft-margin SVM
      </text>

      {/* margins — dotted, same shape as the boundary, slid into position
          and width-animated via transform rather than redrawn */}
      <path
        d={BOUNDARY}
        stroke="currentColor"
        className={`${lineColor} svm-margin-blue`}
        strokeWidth="1.5"
        strokeDasharray="1 5"
        strokeLinecap="round"
      />
      <path
        d={BOUNDARY}
        stroke="currentColor"
        className={`${lineColor} svm-margin-white`}
        strokeWidth="1.5"
        strokeDasharray="1 5"
        strokeLinecap="round"
      />

      {/* boundary — solid, drawn first */}
      <path d={BOUNDARY} stroke="currentColor" className={`${lineColor} svm-boundary`} strokeWidth="2" pathLength="1" strokeDasharray="1" />

      {/* points */}
      <g className="svm-points">
        {BLUE_POINTS.map((p, i) => (
          <circle key={`b-${i}`} cx={p.x} cy={p.y} r={7} className={blueFill} />
        ))}
        {BLUE_OUTLIERS.map((p, i) => (
          <circle key={`bo-${i}`} cx={p.x} cy={p.y} r={7} className={blueFill} />
        ))}
        <circle cx={BLUE_SV.x} cy={BLUE_SV.y} r={7} className={blueFill} />

        {WHITE_POINTS.map((p, i) => (
          <circle key={`w-${i}`} cx={p.x} cy={p.y} r={7} fill="white" stroke={whiteStroke} strokeWidth="1.5" />
        ))}
        <circle cx={WHITE_SV.x} cy={WHITE_SV.y} r={7} fill="white" stroke={whiteStroke} strokeWidth="1.5" />
      </g>

      {/* support vector rings — solid */}
      <circle cx={BLUE_SV.x} cy={BLUE_SV.y} r={13} fill="none" stroke="currentColor" className={`${lineColor} svm-sv-ring`} strokeWidth="1.5" />
      <circle cx={WHITE_SV.x} cy={WHITE_SV.y} r={13} fill="none" stroke="currentColor" className={`${lineColor} svm-sv-ring`} strokeWidth="1.5" />

      {/* outlier rings — dashed, revealed last */}
      {BLUE_OUTLIERS.map((p, i) => (
        <circle
          key={`or-${i}`}
          cx={p.x}
          cy={p.y}
          r={13}
          fill="none"
          stroke="currentColor"
          className={`${lineColor} svm-outlier-ring`}
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      ))}
    </svg>
  );
}
