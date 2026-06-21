import { motion } from "framer-motion"
import { GitBranch, Code, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

export function Projects() {
  const project = projects[0]

  return (
    <section id="projects" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">// flagship product</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Featured Project
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            {`/* The one that actually works. */`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border rounded-2xl overflow-hidden bg-card mt-10"
        >
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono text-primary">{project.tags[0]}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-xs font-mono text-muted-foreground">v2.1.4</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4 rounded-xl bg-secondary/50">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">Language</p>
                    <p className="text-sm font-semibold font-mono">Python 3.12</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">Model</p>
                    <p className="text-sm font-semibold font-mono">Qwen3:8b</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">Runtime</p>
                    <p className="text-sm font-semibold font-mono">Ollama</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">Status</p>
                    <p className="text-sm font-semibold font-mono text-neon-green">Production</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.repoUrl && (
                    <Button asChild className="rounded-full font-mono text-sm gap-2">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <GitBranch className="h-4 w-4" />
                        View Source
                      </a>
                    </Button>
                  )}
                  {project.snippets && project.snippets.length > 0 && (
                    <Button variant="outline" asChild className="rounded-full font-mono text-sm gap-2">
                      <a href={project.snippets[0].rawUrl} target="_blank" rel="noopener noreferrer">
                        <Code className="h-4 w-4" />
                        Raw Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="lg:w-80 shrink-0">
                <div className="border rounded-xl overflow-hidden bg-background">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b bg-muted/30">
                    <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neon-green/60" />
                    <span className="text-xs font-mono text-muted-foreground ml-2">chat.py</span>
                  </div>
                  <div className="p-3 font-mono text-[11px] leading-relaxed text-muted-foreground overflow-hidden max-h-48">
                    <span className="text-primary">class</span> <span className="text-neon-magenta">LlamaChat</span>:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary">def</span> <span className="text-neon-cyan">__init__</span>(<span className="text-muted-foreground">self, model</span>):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.model = model<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.messages = []<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.tools = {"{...}"}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary">def</span> <span className="text-neon-cyan">get_response</span>(<span className="text-muted-foreground">self, messages</span>):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary">while</span> <span className="text-neon-green">True</span>:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response = chat(...)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-muted-foreground"># agentic loop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
