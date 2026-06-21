import { motion } from "framer-motion"
import { ExternalLink, GitBranch } from "lucide-react"
import { projects } from "@/data/projects"

const tagColors: Record<string, string> = {
  Python: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  React: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  TypeScript: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  "Node.js": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  PowerShell: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Flask: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Featured Projects
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group border rounded-xl p-6 sm:p-8 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="View live"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Source code"
                        >
                          <GitBranch className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          tagColors[tag] || "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
