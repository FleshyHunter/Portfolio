import React, { useState, useEffect } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion.js";

const LAYER1 = [50, 130, 210];
const LAYER2 = [20, 90, 160, 230];
const LAYER3 = [70, 170];

// Cycles through a random input -> hidden -> output path, phase by phase:
// 0 idle/settling, 1 edge1 lit, 2-4 hidden node lit (spans edge2 too), 3
// edge2 lit, 4 output node lit, 5 fade before picking a new random path.
function useForwardPulse() {
  const [path, setPath] = useState({ i: 0, j: 0, k: 0 });
  const [phase, setPhase] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const durations = [900, 500, 300, 500, 300, 700];
    const timer = setTimeout(() => {
      setPhase((p) => {
        const next = (p + 1) % durations.length;
        if (next === 0) {
          setPath({
            i: Math.floor(Math.random() * LAYER1.length),
            j: Math.floor(Math.random() * LAYER2.length),
            k: Math.floor(Math.random() * LAYER3.length),
          });
        }
        return next;
      });
    }, durations[phase]);
    return () => clearTimeout(timer);
  }, [phase, reducedMotion]);

  return { path, phase };
}

export default function NeuralGraphic() {
  const { path, phase } = useForwardPulse();

  const edge1Active = phase === 1;
  const node2Active = phase >= 2 && phase <= 4;
  const edge2Active = phase === 3;
  const node3Active = phase >= 4;

  return (
    <svg
      viewBox="0 0 400 250"
      className="relative z-10 w-full max-w-md h-auto"
      fill="none"
      role="img"
      aria-label="Animated abstract neural network illustration"
    >
      {LAYER1.map((y1, i) =>
        LAYER2.map((y2, j) => {
          const isActive = edge1Active && path.i === i && path.j === j;
          return (
            <line
              key={`l1-${i}-${j}`}
              x1={70}
              y1={y1}
              x2={200}
              y2={y2}
              stroke="currentColor"
              strokeWidth={isActive ? 1.5 : 1}
              className={`transition-colors duration-300 ${
                isActive
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-200 dark:text-zinc-800"
              }`}
            />
          );
        })
      )}
      {LAYER2.map((y2, i) =>
        LAYER3.map((y3, j) => {
          const isActive = edge2Active && path.j === i && path.k === j;
          return (
            <line
              key={`l2-${i}-${j}`}
              x1={200}
              y1={y2}
              x2={330}
              y2={y3}
              stroke="currentColor"
              strokeWidth={isActive ? 1.5 : 1}
              className={`transition-colors duration-300 ${
                isActive
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-200 dark:text-zinc-800"
              }`}
            />
          );
        })
      )}

      {LAYER1.map((y, i) => (
        <circle
          key={`n1-${i}`}
          cx={70}
          cy={y}
          r={7}
          className="fill-gray-300 dark:fill-zinc-600"
        />
      ))}
      {LAYER2.map((y, i) => {
        const isActive = node2Active && path.j === i;
        const baseIsBlue = i % 2 === 0;
        return (
          <circle
            key={`n2-${i}`}
            cx={200}
            cy={y}
            r={isActive ? 9 : 7}
            className={`transition-all duration-300 ${
              isActive || baseIsBlue
                ? "fill-blue-600 dark:fill-blue-500"
                : "fill-gray-300 dark:fill-zinc-600"
            }`}
          />
        );
      })}
      {LAYER3.map((y, i) => {
        const isActive = node3Active && path.k === i;
        return (
          <circle
            key={`n3-${i}`}
            cx={330}
            cy={y}
            r={isActive ? 10 : 8}
            className="fill-gray-900 dark:fill-white transition-all duration-300"
          />
        );
      })}
    </svg>
  );
}
