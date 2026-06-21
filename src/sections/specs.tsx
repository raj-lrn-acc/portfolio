import { motion } from "framer-motion"
import { Cpu, Server, Globe, Shield, Coffee, Wifi, Zap, Bug } from "lucide-react"

const specs = [
  { icon: Cpu, label: "Engine", value: "React + TypeScript v5", metric: "98% type-safe", color: "text-neon-cyan" },
  { icon: Server, label: "Runtime", value: "Node.js + Python 3.12", metric: "24/7 uptime", color: "text-neon-green" },
  { icon: Shield, label: "Identity", value: "Active Directory / Entra ID", metric: "500+ users managed", color: "text-neon-magenta" },
  { icon: Zap, label: "Automation", value: "PowerShell + Bash", metric: "60% tasks automated", color: "text-neon-cyan" },
  { icon: Globe, label: "Cloud", value: "Azure / AWS", metric: "99.9% availability", color: "text-neon-green" },
  { icon: Bug, label: "Bug Squash Rate", value: "94.7% on first pass", metric: "stackoverflow.com/blocked", color: "text-neon-magenta" },
  { icon: Coffee, label: "Fuel", value: "Dark roast, black", metric: "~4 cups / stand-up", color: "text-neon-cyan" },
  { icon: Wifi, label: "Latency", value: "Response time: <200ms", metric: "except during stand-up", color: "text-neon-green" },
]

export function Specs() {
  return (
    <section id="specs" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">// system specs</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            The Specs
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            {`/* Premium developer. No subscription required. */`}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mt-10">
          {specs.map((spec, idx) => {
            const Icon = spec.icon
            return (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="bg-card p-6 hover:bg-secondary/50 transition-colors group"
              >
                <Icon className={`h-5 w-5 mb-3 ${spec.color}`} />
                <p className="text-xs font-mono text-muted-foreground mb-1">{spec.label}</p>
                <p className="font-semibold text-sm mb-1">{spec.value}</p>
                <p className="text-xs font-mono text-muted-foreground/60">{spec.metric}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
