import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects, type Project } from "@/data/projects"
import { Footer } from "@/components/Footer"

const categories = ["All", "Security", "Infrastructure", "AI", "Cloud", "Tooling", "Backend"]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered: Project[] =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <main className="relative pt-24 pb-12">
      <div className="px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
            Portfolio &mdash; {new Date().getFullYear()}
          </p>
          <h1 className="text-5xl sm:text-7xl font-serif tracking-tight leading-[0.9]">
            Projects
          </h1>
          <p className="mt-4 text-sm text-muted-foreground max-w-md font-sans leading-relaxed">
            A selection of enterprise infrastructure, automation tooling,
            and full-stack applications.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-sans tracking-wider uppercase rounded-full border transition-colors ${
                activeFilter === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className="group relative overflow-hidden rounded-lg bg-card border border-border/50 p-8 h-full">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-sans">
                        {project.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-sans">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif tracking-tight mb-2 group-hover:text-pink transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed flex-1">
                      {project.subtitle}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground/70 font-sans leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-32">
            <p className="text-muted-foreground text-sm font-sans">No projects found in this category.</p>
          </div>
        )}
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  )
}
