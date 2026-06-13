import { motion } from "framer-motion"
import { Shield, Users, Terminal, Server, Lock, Wrench } from "lucide-react"

const services = [
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
    <section id="services" className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-2">
            What I Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Core Capabilities
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
                className="border rounded-xl p-6 bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
