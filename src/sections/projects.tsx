import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/data/projects"
import { ExternalLink, GitBranch } from "lucide-react"

const filters = ["All", "Python", "React", "TypeScript", "Node.js", "LLM"]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tags.some((t) => t === activeFilter))

  return (
    <section id="projects" className="py-32 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-20">
          <p className="text-xs font-sans tracking-[0.25em] uppercase text-muted-foreground mb-6">
            Projects
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight mb-10">
            Selected Work
          </h2>

          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs sm:text-sm font-sans tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeFilter === f
                    ? "border-foreground text-foreground bg-foreground/5"
                    : "border-border text-muted-foreground/50 hover:text-foreground/70 hover:border-foreground/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-card p-8 sm:p-10 md:p-12 group hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                    {project.tags[0]}
                  </span>
                  <span className="text-muted-foreground/30">&#x2022;</span>
                  <span className="text-[10px] font-mono text-muted-foreground/50">
                    v2.1.4
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl mb-4 tracking-tight">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-foreground/60 hover:text-foreground transition-colors group/link"
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      <span>Source</span>
                      <span className="w-6 h-px bg-foreground/30 group-hover/link:w-8 group-hover/link:bg-foreground transition-all duration-300" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-foreground/60 hover:text-foreground transition-colors group/link"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live</span>
                      <span className="w-6 h-px bg-foreground/30 group-hover/link:w-8 group-hover/link:bg-foreground transition-all duration-300" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
