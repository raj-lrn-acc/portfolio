import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { projects } from "@/data/projects"
import { GitBranch } from "lucide-react"

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))

export function Work() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter))

  return (
    <div className="pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="py-16 md:py-20">
          <p className="text-xs font-medium text-primary tracking-wider uppercase mb-4">
            Projects
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            Selected Work
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveFilter("All")}
            className={`text-xs px-4 py-2 rounded-full border transition-all ${
              activeFilter === "All"
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-border hover:border-foreground/30"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`text-xs px-4 py-2 rounded-full border transition-all ${
                activeFilter === tag
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden mb-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
              >
                <Link
                  to={`/work/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block bg-card p-8 group hover:bg-secondary/50 transition-colors h-full"
                >
                  <p className="text-xs font-mono text-muted-foreground mb-3">
                    {project.tags[0]}
                  </p>
                  <h2 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.repoUrl && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      <GitBranch className="h-3 w-3" />
                      View project
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
