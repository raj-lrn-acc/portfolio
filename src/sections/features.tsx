import { useRef, useState, useEffect } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Cpu, Bug, GitBranch, Users, Zap, Gauge } from "lucide-react"

const stats = [
  { icon: Cpu, label: "Code IQ", value: 157, suffix: "", color: "text-neon-cyan" },
  { icon: Bug, label: "Bug Squash Rate", value: 94.7, suffix: "%", color: "text-neon-green" },
  { icon: GitBranch, label: "Commits This Year", value: 847, suffix: "", color: "text-neon-magenta" },
  { icon: Users, label: "Users Supported", value: 500, suffix: "+", color: "text-neon-cyan" },
  { icon: Zap, label: "Automation Coverage", value: 60, suffix: "%", color: "text-neon-green" },
  { icon: Gauge, label: "Coffee-to-Code Ratio", value: 98, suffix: "%", color: "text-neon-magenta" },
]

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      })
      return controls.stop
    }
  }, [inView, to])

  return <span ref={ref}>{display}{suffix}</span>
}

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">// performance metrics</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Benchmarks
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            {`/* Verified by one guy in a basement. Trust me. */`}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="border rounded-2xl p-8 bg-card relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Icon className={`h-6 w-6 mb-4 ${stat.color}`} />
                  <p className="text-4xl sm:text-5xl font-bold tracking-tight mb-1 font-mono">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
