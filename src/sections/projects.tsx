import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/data/projects"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, ExternalLink } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { CodePreview } from "@/components/code-preview"
import { CodeSnippetDialog } from "@/components/code-snippet-dialog"
import type { CodeSnippet } from "@/data/projects"

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags))).sort()]

export function Projects() {
  const [activeTag, setActiveTag] = useState("All")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeSnippets, setActiveSnippets] = useState<CodeSnippet[]>([])
  const [activeTitle, setActiveTitle] = useState("")
  const [activeRepoUrl, setActiveRepoUrl] = useState<string | undefined>()

  const filtered = activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag))
  const featured = filtered[selectedIndex]

  const openSnippets = (title: string, snippets: CodeSnippet[], repoUrl?: string) => {
    setActiveTitle(title)
    setActiveSnippets(snippets)
    setActiveRepoUrl(repoUrl)
    setDialogOpen(true)
  }

  const selectProject = (i: number) => {
    setSelectedIndex(i)
  }

  return (
    <>
      <section id="projects" className="py-16 md:py-24 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-2">
              Projects
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Things I've Built
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => { setActiveTag(tag); setSelectedIndex(0) }}
                layout
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {tag}
                {tag !== "All" && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {projects.filter((p) => p.tags.includes(tag)).length}
                  </span>
                )}
              </motion.button>
            ))}
            <span className="text-[11px] text-muted-foreground ml-auto">
              {filtered.length} of {projects.length} projects
            </span>
          </motion.div>

          {filtered.length > 0 ? (
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden">
                    {featured.snippets && featured.snippets.length > 0 ? (
                      <button
                        onClick={() => openSnippets(featured.title, featured.snippets!, featured.repoUrl)}
                        className="text-left p-0 border-0 bg-transparent cursor-pointer w-full min-w-0 overflow-hidden"
                      >
                        <CodePreview snippet={featured.snippets[0]} />
                      </button>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/10 via-muted to-primary/5 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="w-10 h-10 mx-auto mb-2 rounded-lg border bg-background/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-muted-foreground">{featured.title}</p>
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{featured.title}</CardTitle>
                        {featured.snippets && featured.snippets.length > 0 && (
                          <button
                            onClick={() => openSnippets(featured.title, featured.snippets!, featured.repoUrl)}
                            className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            title="View code"
                          >
                            <Code className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {featured.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {featured.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2 flex-wrap">
                      {featured.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live
                          </a>
                        </Button>
                      )}
                      {featured.repoUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={featured.repoUrl} target="_blank" rel="noopener noreferrer">
                            <GithubIcon className="h-3.5 w-3.5" />
                            Code
                          </a>
                        </Button>
                      )}
                      {featured.snippets && featured.snippets.length > 0 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openSnippets(featured.title, featured.snippets!, featured.repoUrl)}
                        >
                          <Code className="h-3.5 w-3.5" />
                          View Code
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filtered.map((project, i) => (
                  <button
                    key={project.title}
                    onClick={() => selectProject(i)}
                    className={`text-left rounded-xl border p-3 transition-all duration-200 cursor-pointer hover:border-foreground/30 ${
                      i === selectedIndex
                        ? "border-primary ring-1 ring-primary bg-primary/5"
                        : "border-border bg-background"
                    }`}
                  >
                    {project.snippets && project.snippets.length > 0 ? (
                      <div className="h-12 rounded-lg overflow-hidden mb-2 opacity-70">
                        <CodePreview snippet={project.snippets[0]} />
                      </div>
                    ) : (
                      <div className="h-12 rounded-lg mb-2 bg-muted/50 flex items-center justify-center">
                        <Code className="h-4 w-4 text-muted-foreground/50" />
                      </div>
                    )}
                    <p className="text-xs font-medium truncate">{project.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects match this filter.</p>
            </div>
          )}
        </div>
      </section>

      <CodeSnippetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippets={activeSnippets}
        projectTitle={activeTitle}
        repoUrl={activeRepoUrl}
      />
    </>
  )
}
