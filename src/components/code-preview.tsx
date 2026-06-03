import { useMemo } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"
import type { CodeSnippet } from "@/data/projects"

const PREVIEW_LINES = 6

export function CodePreview({ snippet }: { snippet: CodeSnippet }) {
  const lines = useMemo(() => {
    try {
      const lang = snippet.language === "jsx" ? "javascript" : snippet.language
      const result = hljs.highlight(snippet.code, { language: lang })
      return result.value.split("\n").slice(0, PREVIEW_LINES)
    } catch {
      return snippet.code
        .trim()
        .split("\n")
        .slice(0, PREVIEW_LINES)
        .map((l) => l.replace(/</g, "&lt;").replace(/>/g, "&gt;"))
    }
  }, [snippet])

  return (
    <div className="relative cursor-pointer group overflow-hidden">
      <div className="max-w-full min-w-0">
        <pre className="p-3 sm:p-4 text-[10px] sm:text-xs leading-relaxed font-mono !bg-[#011627] m-0 select-none whitespace-pre overflow-x-hidden">
          <code className="!bg-transparent !p-0 !block hljs overflow-hidden">
            {lines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <span className="hidden sm:inline-block text-right pr-3 sm:pr-4 text-white/30 select-none w-6 sm:w-8">
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: line || " " }} />
              </div>
            ))}
          </code>
        </pre>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
    </div>
  )
}
