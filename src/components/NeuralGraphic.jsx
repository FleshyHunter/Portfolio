import React from "react";

export default function NeuralGraphic() {
  const layer1 = [50, 130, 210];
  const layer2 = [20, 90, 160, 230];
  const layer3 = [70, 170];

  return (
    <svg
      viewBox="0 0 400 250"
      className="relative z-10 w-full max-w-md h-auto"
      fill="none"
      role="img"
      aria-label="Abstract neural network illustration"
    >
      {layer1.map((y1, i) =>
        layer2.map((y2, j) => (
          <line
            key={`l1-${i}-${j}`}
            x1={70}
            y1={y1}
            x2={200}
            y2={y2}
            stroke="currentColor"
            className="text-zinc-800"
            strokeWidth="1"
          />
        ))
      )}
      {layer2.map((y2, i) =>
        layer3.map((y3, j) => (
          <line
            key={`l2-${i}-${j}`}
            x1={200}
            y1={y2}
            x2={330}
            y2={y3}
            stroke="currentColor"
            className="text-zinc-800"
            strokeWidth="1"
          />
        ))
      )}
      {layer1.map((y, i) => (
        <circle key={`n1-${i}`} cx={70} cy={y} r={7} className="fill-zinc-600" />
      ))}
      {layer2.map((y, i) => (
        <circle
          key={`n2-${i}`}
          cx={200}
          cy={y}
          r={7}
          className={i % 2 === 0 ? "fill-blue-500" : "fill-zinc-600"}
        />
      ))}
      {layer3.map((y, i) => (
        <circle key={`n3-${i}`} cx={330} cy={y} r={8} className="fill-white" />
      ))}
    </svg>
  );
}
