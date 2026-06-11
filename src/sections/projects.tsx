import { useState } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { projects } from "@/data/projects"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [[page, direction], setPage] = useState([0, 0])

  const filtered = activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag))

  const openSnippets = (title: string, snippets: CodeSnippet[], repoUrl?: string) => {
    setActiveTitle(title)
    setActiveSnippets(snippets)
    setActiveRepoUrl(repoUrl)
    setDialogOpen(true)
  }

  const paginate = (dir: number) => {
    const newIndex = carouselIndex + dir
    if (newIndex < 0 || newIndex >= filtered.length) return
    setPage([newIndex, dir])
    setCarouselIndex(newIndex)
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x)
    if (swipe < -swipeConfidenceThreshold) paginate(1)
    else if (swipe > swipeConfidenceThreshold) paginate(-1)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
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
                onClick={() => { setActiveTag(tag); setCarouselIndex(0); setPage([0, 0]) }}
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
            <div className="relative">
              <div className="overflow-hidden rounded-xl">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={handleDragEnd}
                    className="outline-none"
                  >
                    <Card className="overflow-hidden">
                      {filtered[carouselIndex].snippets && filtered[carouselIndex].snippets.length > 0 ? (
                        <button
                          onClick={() => openSnippets(filtered[carouselIndex].title, filtered[carouselIndex].snippets!, filtered[carouselIndex].repoUrl)}
                          className="text-left p-0 border-0 bg-transparent cursor-pointer w-full min-w-0 overflow-hidden"
                        >
                          <CodePreview snippet={filtered[carouselIndex].snippets[0]} />
                        </button>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/10 via-muted to-primary/5 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-lg border bg-background/50 flex items-center justify-center">
                              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                              </svg>
                            </div>
                            <p className="text-xs font-medium text-muted-foreground">{filtered[carouselIndex].title}</p>
                          </div>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">{filtered[carouselIndex].title}</CardTitle>
                          {filtered[carouselIndex].snippets && filtered[carouselIndex].snippets.length > 0 && (
                            <button
                              onClick={() => openSnippets(filtered[carouselIndex].title, filtered[carouselIndex].snippets!, filtered[carouselIndex].repoUrl)}
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
                          {filtered[carouselIndex].description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {filtered[carouselIndex].tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="gap-2 flex-wrap">
                        {filtered[carouselIndex].liveUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={filtered[carouselIndex].liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Live
                            </a>
                          </Button>
                        )}
                        {filtered[carouselIndex].repoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={filtered[carouselIndex].repoUrl} target="_blank" rel="noopener noreferrer">
                              <GithubIcon className="h-3.5 w-3.5" />
                              Code
                            </a>
                          </Button>
                        )}
                        {filtered[carouselIndex].snippets && filtered[carouselIndex].snippets.length > 0 && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => openSnippets(filtered[carouselIndex].title, filtered[carouselIndex].snippets!, filtered[carouselIndex].repoUrl)}
                          >
                            <Code className="h-3.5 w-3.5" />
                            View Code
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              {filtered.length > 1 && (
                <>
                  <button
                    onClick={() => paginate(-1)}
                    disabled={carouselIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    disabled={carouselIndex === filtered.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-5">
                    {filtered.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setPage([i, i > carouselIndex ? 1 : -1]); setCarouselIndex(i) }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === carouselIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Go to project ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
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
