import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

// Two real run patterns, alternated across loops — see the component
// below for why this replaced always showing the same path.
const LOOP_RUN = [
  { index: -1, duration: 700, cycling: false },
  { index: 0, duration: 700, cycling: false },
  { index: 1, duration: 700, cycling: false },
  { index: 2, duration: 700, cycling: false },
  { index: 1, duration: 700, cycling: true },
  { index: 2, duration: 700, cycling: true },
  { index: 1, duration: 700, cycling: true },
  { index: 2, duration: 700, cycling: true },
  { index: 3, duration: 1800, cycling: false },
];

const DIRECT_RUN = [
  { index: -1, duration: 700, cycling: false },
  { index: 0, duration: 700, cycling: false },
  { index: 1, duration: 700, cycling: false },
  { index: 3, duration: 1800, cycling: false },
];

function useTraversal() {
  const [usingLoopRun, setUsingLoopRun] = useState(true);
  const [seqIndex, setSeqIndex] = useState(0);
  const [visited, setVisited] = useState(() => new Set());

  const activeRun = usingLoopRun ? LOOP_RUN : DIRECT_RUN;
  const current = activeRun[seqIndex];

  useEffect(() => {
    if (current.index === -1) {
      setVisited(new Set());
    } else {
      setVisited((prev) =>
        prev.has(current.index) ? prev : new Set(prev).add(current.index)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seqIndex, usingLoopRun]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLastStep = seqIndex === activeRun.length - 1;
      if (isLastStep) {
        setUsingLoopRun((prev) => !prev);
        setSeqIndex(0);
      } else {
        setSeqIndex((i) => i + 1);
      }
    }, current.duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seqIndex, usingLoopRun]);

  return { currentIndex: current.index, cycling: current.cycling, visited, usingLoopRun };
}

const NODES = [
  { x: 60, label: "Query" },
  { x: 200, label: "Agent" },
  { x: 340, label: "RAG / Tools" },
  { x: 480, label: "Generate" },
];

export default function TraversalGraphic() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { currentIndex, cycling, visited, usingLoopRun } = useTraversal();

  const unlitFill = isDark ? "#3f3f46" : "#d1d5db";
  const reachedFill = isDark ? "#ffffff" : "#111827";
  const ringColor = isDark ? "#3b82f6" : "#2563eb";
  const dimLine = isDark ? "#3f3f46" : "#d1d5db";
  const labelDim = isDark ? "#71717a" : "#9ca3af";
  const labelReached = isDark ? "#ffffff" : "#111827";

  const rowY = 90;
  // Took the tool loop this run only if Agent and Generate are both
  // visited but RAG/Tools never was — robust regardless of which run
  // array actually produced it.
  const shortcutTraversed = visited.has(1) && visited.has(3) && !visited.has(2);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <svg
        viewBox="0 0 540 190"
        className="w-full max-w-xl h-auto"
        role="img"
        aria-label="Traversal animation: a query reaches an agent, which either loops with RAG/Tools twice before generating, or occasionally skips straight to generating"
      >
        <style>{`
          @keyframes flowDash {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -28; }
          }
          @keyframes pulseRing {
            0%, 100% { opacity: 0.5; transform: scale(0.9); }
            50% { opacity: 0.12; transform: scale(1.2); }
          }
          .flow-line { animation: flowDash 0.8s linear infinite; }
          .pulse-ring { animation: pulseRing 1.4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .flow-line, .pulse-ring { animation: none !important; }
          }
        `}</style>

        <text
          x={270}
          y={20}
          textAnchor="middle"
          fontSize="18"
          fontWeight={600}
          letterSpacing="0.05em"
          fill={ringColor}
          style={{ textTransform: "uppercase" }}
        >
          Agent Workflows
        </text>

        {/* shortcut arc: Agent straight to Generate, bypassing RAG/Tools.
            pathLength="1" normalizes the curve to exactly 1 unit so the
            hide/reveal dash math is always exact, regardless of the
            curve's true rendered length. */}
        <path
          d="M 222 80 C 300 38, 400 38, 458 80"
          fill="none"
          pathLength="1"
          stroke={shortcutTraversed ? ringColor : dimLine}
          strokeWidth="2"
          strokeDasharray="1"
          strokeDashoffset={shortcutTraversed ? 0 : 1}
          style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.6s ease" }}
        />

        {/* main connecting lines */}
        {[0, 1, 2].map((i) => {
          const x1 = NODES[i].x + 22;
          const x2 = NODES[i + 1].x - 22;
          const length = x2 - x1;
          const traversed = visited.has(i) && visited.has(i + 1);
          const isBridge = i === 1;
          const flowing = isBridge && cycling;

          return (
            <line
              key={`line-${i}`}
              x1={x1}
              y1={rowY}
              x2={x2}
              y2={rowY}
              stroke={traversed ? ringColor : dimLine}
              strokeWidth="2"
              strokeDasharray={flowing ? "8 6" : length}
              strokeDashoffset={flowing ? undefined : traversed ? 0 : length}
              className={flowing ? "flow-line" : undefined}
              style={
                flowing
                  ? undefined
                  : { transition: "stroke-dashoffset 0.6s ease, stroke 0.6s ease" }
              }
            />
          );
        })}

        {NODES.map((node, i) => {
          const reached = visited.has(i);
          const isCurrent = i === currentIndex;
          return (
            <g key={node.label}>
              {isCurrent && (
                <circle
                  cx={node.x}
                  cy={rowY}
                  r={26}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="2"
                  className="pulse-ring"
                  style={{ transformOrigin: `${node.x}px ${rowY}px` }}
                />
              )}
              <circle
                cx={node.x}
                cy={rowY}
                r={20}
                fill="none"
                stroke={ringColor}
                strokeWidth="2"
                style={{ opacity: reached ? 1 : 0, transition: "opacity 0.5s ease" }}
              />
              <circle
                cx={node.x}
                cy={rowY}
                r={14}
                fill={reached ? reachedFill : unlitFill}
                style={{ transition: "fill 0.5s ease" }}
              />
              <text
                x={node.x}
                y={rowY + 42}
                textAnchor="middle"
                fontSize="12"
                fontWeight={reached ? 600 : 500}
                fill={reached ? labelReached : labelDim}
                style={{ transition: "fill 0.5s ease" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className={`text-xs ${isDark ? "text-zinc-600" : "text-gray-400"}`}>
        {usingLoopRun ? "This run: with a tool call" : "This run: direct response"}
      </p>
    </div>
  );
}
