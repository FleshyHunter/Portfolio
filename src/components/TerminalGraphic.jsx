import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const LOG_LINES = [
  "[+] Building 4.1s (11/11) FINISHED",
  " => [backend internal] load build definition from Dockerfile          0.1s",
  " => [frontend internal] load build definition from Dockerfile         0.1s",
  " => [ingestion internal] load build definition from Dockerfile        0.1s",
  " => [backend] cargo build --release                                  1.9s",
  " => [frontend] npm run build                                         0.8s",
  " => [ingestion] pip install -r requirements.txt                      1.1s",
  " => [backend] exporting layers                                       0.2s",
  "[+] Running 7/7 Created",
  " ✔ Network odin_default        Created                              0.1s",
  " ✔ Container redis             Created                              0.1s",
  " ✔ Container chromadb          Created                              0.1s",
  " ✔ Container ollama            Created                              0.1s",
  " ✔ Container ingestion         Created                              0.1s",
  " ✔ Container backend           Created                              0.1s",
  " ✔ Container frontend          Created                              0.1s",
  "[+] Attaching to logs...",
  "redis      | Ready to accept connections tcp",
  "chromadb   | INFO: collection 'lecture_notes' ready",
  "ollama     | INFO: model qwen2.5:7b loaded, listening on :11434",
  "ingestion  | INFO: embedding service ready, sentence-transformers loaded",
  "backend    | INFO odin_backend: connected to ChromaDB, Redis, Ollama",
  "backend    | INFO odin_backend: Tailscale tunnel established to GPU node",
  "backend    | INFO odin_backend: axum server listening on 0.0.0.0:3000",
  "frontend   | VITE ready in 380 ms, Local: http://localhost:5173",
  "status     | Deployment successful. All services healthy.",
];

const COMMAND_DELAY = 1100;
const LINE_INTERVAL = 220;
const HOLD_AT_END = 2600;

function useTerminalPlayback() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const delay =
      visibleCount === 0
        ? COMMAND_DELAY
        : visibleCount < LOG_LINES.length
          ? LINE_INTERVAL
          : HOLD_AT_END;

    const timer = window.setTimeout(() => {
      if (visibleCount < LOG_LINES.length) {
        setVisibleCount((count) => count + 1);
      } else {
        setVisibleCount(0);
        setRunId((id) => id + 1);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [visibleCount]);

  return { visibleCount, runId };
}

export default function TerminalGraphic() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { visibleCount, runId } = useTerminalPlayback();
  const scrollRef = useRef(null);

  const dotColor = isDark ? "bg-zinc-700" : "bg-gray-300";
  const promptColor = isDark ? "text-blue-500" : "text-blue-600";
  const textColor = isDark ? "text-zinc-300" : "text-gray-700";
  const summaryColor = isDark ? "text-white" : "text-gray-900";

  useEffect(() => {
    const terminal = scrollRef.current;
    if (!terminal) return;

    terminal.scrollTop = visibleCount === 0 ? 0 : terminal.scrollHeight;
  }, [visibleCount]);

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ containerType: "inline-size" }}
      role="img"
      aria-label="Animated terminal showing a successful Docker deployment"
    >
      <style>{`
        @keyframes typeCommand {
          from { width: 0; }
          to { width: 27ch; }
        }
        @keyframes blinkCursor {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes fadeTerminalLine {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .term-command {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          animation: typeCommand 1s steps(27) forwards;
        }
        .term-cursor { animation: blinkCursor 0.9s step-end infinite; }
        .term-line { animation: fadeTerminalLine 0.3s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .term-command { animation: none !important; width: 27ch; }
          .term-cursor, .term-line { animation: none !important; }
        }
      `}</style>

      <div
        className="w-full h-full flex flex-col p-3 font-mono text-[8px] leading-relaxed overflow-hidden"
        style={{ fontSize: "clamp(5px, 2cqw, 10px)" }}
      >
        <div className="flex items-center gap-1.5 mb-3 flex-shrink-0" aria-hidden="true">
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        </div>

        <div ref={scrollRef} className="overflow-y-hidden flex-1">
          <div key={runId} className="flex items-center">
            <span className={`${promptColor} mr-2`}>$</span>
            <span className={`term-command ${textColor}`}>
              docker-compose up --build -d
            </span>
            <span
              className={`term-cursor inline-block w-1.5 h-3.5 ml-0.5 flex-shrink-0 ${
                isDark ? "bg-zinc-300" : "bg-gray-700"
              }`}
            />
          </div>

          {LOG_LINES.slice(0, visibleCount).map((line) => {
            const isStatus = line.startsWith("status");
            return (
              <p
                key={line}
                className={`term-line whitespace-pre ${
                  isStatus ? `font-semibold ${summaryColor}` : textColor
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
