import { useState, useMemo } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import type { CodeSnippet } from "@/data/projects"

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-[10px] sm:text-xs text-white/60 hover:text-white transition-colors shrink-0"
    >
      {copied ? (
        <><Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Copied</>
      ) : (
        <><Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Copy</>
      )}
    </button>
  )
}

function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const lines = useMemo(() => {
    try {
      const lang = snippet.language === "jsx" ? "javascript" : snippet.language
      const result = hljs.highlight(snippet.code, { language: lang })
      return result.value.split("\n")
    } catch {
      return snippet.code
        .trim()
        .split("\n")
        .map((l) => l.replace(/</g, "&lt;").replace(/>/g, "&gt;"))
    }
  }, [snippet])

  return (
    <div className="relative rounded-lg overflow-hidden border max-w-full">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#011627] border-b border-white/10 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] sm:text-xs text-white/70 font-mono truncate">{snippet.label}</span>
          <Badge variant="secondary" className="text-[9px] sm:text-[10px] px-1.5 py-0 h-4 sm:h-5 shrink-0">
            {snippet.language}
          </Badge>
        </div>
        <CopyButton code={snippet.code} />
      </div>
      <div className="overflow-x-auto max-w-full">
        <pre className="p-3 sm:p-4 text-[10px] sm:text-xs leading-relaxed max-h-[50vh] sm:max-h-[60vh] font-mono !bg-[#011627] m-0 whitespace-pre w-max min-w-full">
          <code className="!bg-transparent !p-0 !block hljs">
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
    </div>
  )
}

export function CodeSnippetDialog({
  open,
  onOpenChange,
  snippets,
  projectTitle,
  repoUrl,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  snippets: CodeSnippet[]
  projectTitle: string
  repoUrl?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 mx-4 sm:mx-auto rounded-xl">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-3">
          <DialogTitle className="text-sm sm:text-base">{projectTitle}</DialogTitle>
        </DialogHeader>

        {snippets.length > 1 ? (
          <Tabs defaultValue={snippets[0].label} className="px-4 sm:px-6 pb-4 sm:pb-6 max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <TabsList className="self-start overflow-x-auto max-w-full">
                {snippets.map((s) => (
                  <TabsTrigger key={s.label} value={s.label} className="text-[11px] sm:text-sm whitespace-nowrap">
                    {s.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {repoUrl && (
                <Button variant="outline" size="sm" asChild className="self-end sm:self-auto">
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-3.5 w-3.5" />
                    Repository
                  </a>
                </Button>
              )}
            </div>
            {snippets.map((s) => (
              <TabsContent key={s.label} value={s.label}>
                <CodeBlock snippet={s} />
              </TabsContent>
            ))}
          </Tabs>
        ) : snippets[0] ? (
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{snippets[0].label}</span>
              {repoUrl && (
                <Button variant="outline" size="sm" asChild className="self-start sm:self-auto">
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-3.5 w-3.5" />
                    Repository
                  </a>
                </Button>
              )}
            </div>
            <CodeBlock snippet={snippets[0]} />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
