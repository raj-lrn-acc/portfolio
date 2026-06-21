import { motion } from "framer-motion"
import { Shield, Users, Terminal, Server, Lock, Wrench } from "lucide-react"

const items = [
  {
    icon: Shield,
    title: "Identity & Access Management",
    description: "User provisioning, security groups, PIM workflows, MFA resets, and role-based access control across enterprise directories.",
  },
  {
    icon: Server,
    title: "Active Directory & Exchange",
    description: "AD administration, GPO management, shared mailboxes, distribution groups, and mail-enabled security groups.",
  },
  {
    icon: Users,
    title: "End-User Support",
    description: "Troubleshoot login issues, authentication errors, account lockouts — with detailed documentation and ITIL-aware service delivery.",
  },
  {
    icon: Terminal,
    title: "Automation & Scripting",
    description: "PowerShell scripts for bulk AD operations, Python tools for workflow automation, and CLI utilities for IT tasks.",
  },
  {
    icon: Lock,
    title: "Security & Compliance",
    description: "Handle sensitive data under regulatory controls, maintain audit trails, and enforce security protocols in IAM processes.",
  },
  {
    icon: Wrench,
    title: "Full-Stack Development",
    description: "Build internal tools and dashboards with React, Node.js, and Python — bridging IT operations with software engineering.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            What I Do
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
          {items.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="bg-background p-6 sm:p-8 hover:bg-secondary/30 transition-colors"
              >
                <Icon className="h-6 w-6 mb-4 text-foreground" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
