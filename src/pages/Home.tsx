import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, GitBranch } from "lucide-react"
import { projects } from "@/data/projects"

const disciplines = [
  "Identity & Access Management",
  "Active Directory",
  "Automation & Scripting",
  "Full-Stack Development",
  "Cloud Infrastructure",
  "Security & Compliance",
]

const sectors = [
  "Enterprise IT",
  "Technology",
  "Professional Services",
  "Finance",
  "Healthcare",
  "Education",
]

export function Home() {
  return (
    <>
      <section className="min-h-[85vh] flex flex-col justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
              IT Operations &amp; Software Engineering
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
              Rajveer
              <br />
              <span className="text-muted-foreground font-light">Singh</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              I bridge enterprise IT with modern development. IAM, Active Directory,
              automation, and full-stack tools — streamlining how organizations
              manage identity and access.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-medium rounded-full hover:border-foreground/50 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
            <div>
              <p className="text-xs font-medium text-primary tracking-wider uppercase mb-4">
                Disciplines
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
                I design&nbsp;everything
              </h2>
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                From identity infrastructure to full-stack applications — I combine
                enterprise IT operations with modern development practices to build
                tools that work.
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {disciplines.map((d) => (
                  <span key={d} className="text-sm text-muted-foreground">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="text-xs font-medium text-primary tracking-wider uppercase mb-4">
                Sectors
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
                for&nbsp;everyone
              </h2>
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Experienced across regulated and fast-paced environments where
                security, reliability, and efficiency are non-negotiable.
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {sectors.map((s) => (
                  <span key={s} className="text-sm text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium text-primary tracking-wider uppercase mb-4">
              Featured Project
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Latest Work
            </h2>
          </div>
          <div className="border rounded-2xl overflow-hidden bg-card">
            {projects.slice(0, 1).map((project) => (
              <div key={project.title} className="p-8 sm:p-10 md:p-12">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full border bg-background text-muted-foreground"
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
                          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          <GitBranch className="h-4 w-4" />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <blockquote className="max-w-3xl">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-[1.2] text-muted-foreground">
              &ldquo;IT Operations isn't just about keeping the lights on — it's
              about building systems that let people do their best work. Every
              script, every automation, every tool is an investment in human
              potential.&rdquo;
            </p>
            <footer className="mt-6">
              <p className="text-sm font-medium">Rajveer Singh</p>
              <p className="text-sm text-muted-foreground">IT Operations Professional</p>
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  )
}
