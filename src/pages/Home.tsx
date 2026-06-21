import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { projects } from "@/data/projects"
import { Footer } from "@/components/Footer"
import Scene3D from "@/components/Scene3D"

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!gridRef.current) return
      const rect = gridRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gridRef.current.style.setProperty("--mouse-x", `${x * 20}px`)
      gridRef.current.style.setProperty("--mouse-y", `${y * 20}px`)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <main className="relative">
      <Scene3D />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-sans"
          >
            Portfolio &mdash; 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-7xl md:text-9xl font-serif tracking-tight leading-[0.9] text-foreground"
          >
            Rajveer
            <br />
            <span className="font-serif italic font-light text-pink">Singh</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-sm text-muted-foreground max-w-md mx-auto font-sans leading-relaxed"
          >
            Enterprise infrastructure, identity access,
            <br />
            and full-stack tooling.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex items-center justify-center gap-3 text-xs text-muted-foreground"
          >
            <span className="w-8 h-px bg-muted-foreground/50" />
            <span className="tracking-widest uppercase font-sans">Drag to explore</span>
            <span className="w-8 h-px bg-muted-foreground/50" />
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative z-10 px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-16"
          >
            <span className="text-2xl text-pink font-serif italic">&#8220;</span>
            <span className="text-xs tracking-widest uppercase text-muted-foreground font-sans">Selected Projects</span>
          </motion.div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/projects`}
                  className="project-card block group relative overflow-hidden rounded-lg bg-card border border-border/50 p-8"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-sans">
                        {project.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-sans">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif tracking-tight mb-2 group-hover:text-pink transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                      {project.subtitle}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="font-sans">View Project</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform">
                        <path d="M1 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground/80 hover:text-pink transition-colors"
            >
              View all projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact / Let's work together */}
      <section className="relative z-10 px-6 py-32 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans"
          >
            Let&apos;s Work Together
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif tracking-tight leading-tight mb-8"
          >
            Have a project in mind?
            <br />
            <Link to="/contact" className="text-pink hover:underline underline-offset-4">
              Get in touch
            </Link>
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
