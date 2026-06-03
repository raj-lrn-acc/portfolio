import { useState } from "react"
import { Highlight, themes } from "prism-react-renderer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check, ExternalLink } from "lucide-react"
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
      className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
    >
      {copied ? (
        <><Check className="h-3.5 w-3.5" /> Copied</>
      ) : (
        <><Copy className="h-3.5 w-3.5" /> Copy</>
      )}
    </button>
  )
}

function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  return (
    <div className="relative rounded-lg overflow-hidden border">
      <div className="flex items-center justify-between px-4 py-2 bg-[#011627] border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/70 font-mono">{snippet.label}</span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
            {snippet.language}
          </Badge>
        </div>
        <CopyButton code={snippet.code} />
      </div>
      <Highlight code={snippet.code.trim()} language={snippet.language} theme={themes.nightOwl}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 text-xs leading-relaxed overflow-auto max-h-[60vh] font-mono !bg-[#011627] m-0">
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell text-right pr-4 text-[#5a7e9c] select-none w-[1%] min-w-[2.5rem]">
                    {i + 1}
                  </span>
                  <span className="table-cell">
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
      <DialogContent className="sm:max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base">{projectTitle}</DialogTitle>
            {repoUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-3.5 w-3.5" />
                  Repository
                </a>
              </Button>
            )}
          </div>
        </DialogHeader>

        {snippets.length > 1 ? (
          <Tabs defaultValue={snippets[0].label} className="px-6 pb-6">
            <TabsList className="mb-3">
              {snippets.map((s) => (
                <TabsTrigger key={s.label} value={s.label}>
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {snippets.map((s) => (
              <TabsContent key={s.label} value={s.label}>
                <CodeBlock snippet={s} />
              </TabsContent>
            ))}
          </Tabs>
        ) : snippets[0] ? (
          <div className="px-6 pb-6">
            <CodeBlock snippet={snippets[0]} />
          </div>
        ) : null}

        {repoUrl && (
          <div className="px-6 pb-4">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              View full source on GitHub
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
