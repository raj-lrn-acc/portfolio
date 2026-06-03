import { Highlight, themes } from "prism-react-renderer"
import type { CodeSnippet } from "@/data/projects"

const PREVIEW_LINES = 6

export function CodePreview({ snippet }: { snippet: CodeSnippet }) {
  const lines = snippet.code.trim().split("\n").slice(0, PREVIEW_LINES)
  const previewCode = lines.join("\n")

  return (
    <div className="relative cursor-pointer group overflow-hidden">
      <div className="overflow-x-auto max-w-full">
        <Highlight code={previewCode} language={snippet.language} theme={themes.nightOwl}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="p-3 sm:p-4 text-[10px] sm:text-xs leading-relaxed font-mono !bg-[#011627] m-0 select-none whitespace-pre min-w-0">
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })} className="flex">
                    <span className="hidden sm:inline-block text-right pr-3 sm:pr-4 text-[#5a7e9c] select-none w-6 sm:w-8 shrink-0">
                      {i + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#011627] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
    </div>
  )
}
