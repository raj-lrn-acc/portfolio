import { useRef } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { projects } from "@/data/projects"
import { Footer } from "@/components/Footer"

const ease = [0.25, 0.1, 0.25, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease },
}

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <main className="relative">
      {/* Hero - transparent overlay */}
      <section className="relative min-h-screen flex items-center justify-center pointer-events-none">
        <div className="relative z-10 text-center px-6 pointer-events-auto">
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6 font-sans"
          >
            Portfolio &mdash; 2026
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="text-5xl sm:text-7xl md:text-9xl font-serif tracking-tight leading-[0.9] text-white"
          >
            Rajveer
            <br />
            <span className="font-serif italic font-light text-pink">Singh</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.6 }}
            className="mt-6 text-sm text-white/40 max-w-md mx-auto font-sans leading-relaxed"
          >
            Enterprise infrastructure, identity access,
            <br />
            and full-stack tooling.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease }}
            className="mt-10 flex items-center justify-center gap-3 text-xs text-white/30"
          >
            <span className="w-8 h-px bg-white/20" />
            <span className="tracking-widest uppercase font-sans animate-pulse">Scroll to explore</span>
            <span className="w-8 h-px bg-white/20" />
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="relative z-10 px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-16"
          >
            <span className="text-2xl text-pink font-serif italic">&quot;</span>
            <span className="text-xs tracking-widest uppercase text-white/50 font-sans">Selected Projects</span>
          </motion.div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease }}
              >
                <Link
                  to={`/projects`}
                  className="project-card block group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-500"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[10px] tracking-widest uppercase text-white/40 font-sans">{project.category}</span>
                      <span className="text-[10px] text-white/40 font-sans">{project.year}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif tracking-tight mb-2 text-white group-hover:text-pink transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/40 font-sans leading-relaxed">{project.subtitle}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-white/40 group-hover:text-white transition-colors">
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
            transition={{ duration: 0.6, ease }}
            className="mt-12 text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60 hover:text-pink transition-colors"
            >
              View all projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 px-6 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-xs tracking-widest uppercase text-white/40 mb-6 font-sans"
          >
            Let&apos;s Work Together
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="text-4xl sm:text-5xl font-serif tracking-tight leading-tight mb-8 text-white"
          >
            Have a project in mind?
            <br />
            <Link to="/contact" className="text-pink hover:underline underline-offset-4">Get in touch</Link>
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
