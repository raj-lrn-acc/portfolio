import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, GitBranch, Code } from "lucide-react"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"

export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug)

  if (!project) {
    return (
      <div className="pt-32 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link
          to="/work"
          className="text-primary hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-8 mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-primary">{project.tags[0]}</span>
            <span className="text-muted-foreground/30">/</span>
            <span className="text-xs font-mono text-muted-foreground">v2.1.4</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {project.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 rounded-xl bg-secondary/50">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">Language</p>
              <p className="text-sm font-semibold font-mono">Python 3.12</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">Model</p>
              <p className="text-sm font-semibold font-mono">Qwen3:8b</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">Runtime</p>
              <p className="text-sm font-semibold font-mono">Ollama</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">Status</p>
              <p className="text-sm font-semibold text-primary">Production</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.repoUrl && (
              <Button asChild className="rounded-full gap-2">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <GitBranch className="h-4 w-4" />
                  Source Code
                </a>
              </Button>
            )}
          </div>

          {project.snippets && project.snippets.length > 0 && (
            <div className="mt-12 space-y-8">
              <h2 className="text-xl font-bold tracking-tight">Code Preview</h2>
              {project.snippets.map((snippet) => (
                <div key={snippet.label} className="border rounded-xl overflow-hidden bg-card">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/30">
                    <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    <span className="text-xs font-mono text-muted-foreground ml-2">
                      {snippet.label}
                    </span>
                    <a
                      href={snippet.rawUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Code className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-muted-foreground code-scrollbar">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
