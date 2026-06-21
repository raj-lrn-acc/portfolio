import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects, type Project } from "@/data/projects"
import { Footer } from "@/components/Footer"

const categories = ["All", "Security", "Infrastructure", "AI", "Cloud", "Tooling", "Backend"]
const ease = [0.25, 0.1, 0.25, 1] as const

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const filtered: Project[] = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <main className="relative pt-32 pb-12">
      <div className="px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4 font-sans">Portfolio &mdash; {new Date().getFullYear()}</p>
          <h1 className="text-5xl sm:text-7xl font-serif tracking-tight leading-[0.9] text-white">Projects</h1>
          <p className="mt-4 text-sm text-white/40 max-w-md font-sans leading-relaxed">
            A selection of enterprise infrastructure, automation tooling, and full-stack applications.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-sans tracking-wider uppercase rounded-full border transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-pink text-background border-pink"
                  : "bg-transparent text-white/50 border-white/20 hover:text-white hover:border-white/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease }}
              >
                <div className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-8 h-full hover:bg-white/10 transition-all duration-500">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[10px] tracking-widest uppercase text-white/40 font-sans">{project.category}</span>
                      <span className="text-[10px] text-white/40 font-sans">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-serif tracking-tight mb-2 text-white group-hover:text-pink transition-colors">{project.title}</h3>
                    <p className="text-xs text-white/40 font-sans leading-relaxed flex-1">{project.subtitle}</p>
                    <p className="mt-4 text-xs text-white/30 font-sans leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-32">
            <p className="text-white/40 text-sm font-sans">No projects found in this category.</p>
          </div>
        )}
      </div>
      <div className="mt-24"><Footer /></div>
    </main>
  )
}
