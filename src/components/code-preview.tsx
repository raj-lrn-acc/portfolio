import type { CodeSnippet } from "@/data/projects"

const PREVIEW_LINES = 6

export function CodePreview({ snippet }: { snippet: CodeSnippet }) {
  const lines = snippet.code.trim().split("\n").slice(0, PREVIEW_LINES)

  return (
    <div className="relative cursor-pointer group overflow-hidden">
      <div className="max-w-full">
        <pre className="p-3 sm:p-4 text-[10px] sm:text-xs leading-relaxed font-mono !bg-[#011627] m-0 select-none whitespace-pre overflow-hidden text-white/70">
          <code>
            {lines.map((line, i) => (
              <div key={i}>
                <span className="hidden sm:inline-block text-right pr-3 sm:pr-4 text-white/30 select-none w-6 sm:w-8">
                  {i + 1}
                </span>
                {line}
              </div>
            ))}
          </code>
        </pre>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#011627] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
    </div>
  )
}
