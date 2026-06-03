import { useState, useMemo } from "react"
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
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeSnippets, setActiveSnippets] = useState<CodeSnippet[]>([])
  const [activeTitle, setActiveTitle] = useState("")
  const [activeRepoUrl, setActiveRepoUrl] = useState<string | undefined>()

  const filtered = useMemo(
    () => (activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag))),
    [activeTag]
  )

  const openSnippets = (title: string, snippets: CodeSnippet[], repoUrl?: string) => {
    setActiveTitle(title)
    setActiveSnippets(snippets)
    setActiveRepoUrl(repoUrl)
    setDialogOpen(true)
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
            className="flex flex-wrap gap-2 mb-8"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="min-w-0"
                >
                    <Card className="h-full flex flex-col overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      {project.snippets && project.snippets.length > 0 ? (
                        <button
                          onClick={() => openSnippets(project.title, project.snippets!, project.repoUrl)}
                          className="text-left p-0 border-0 bg-transparent cursor-pointer w-full min-w-0 overflow-hidden"
                        >
                          <CodePreview snippet={project.snippets[0]} />
                        </button>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/10 via-muted to-primary/5 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-lg border bg-background/50 flex items-center justify-center">
                              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                              </svg>
                            </div>
                            <p className="text-xs font-medium text-muted-foreground">{project.title}</p>
                          </div>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          {project.snippets && project.snippets.length > 0 && (
                            <button
                              onClick={() => openSnippets(project.title, project.snippets!, project.repoUrl)}
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
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="gap-2 flex-wrap">
                        {project.liveUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Live
                            </a>
                          </Button>
                        )}
                        {project.repoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                              <GithubIcon className="h-3.5 w-3.5" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.snippets && project.snippets.length > 0 && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => openSnippets(project.title, project.snippets!, project.repoUrl)}
                          >
                            <Code className="h-3.5 w-3.5" />
                            View Code
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
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
