import { motion } from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex justify-center md:block"
          >
            <Avatar className="w-32 h-32 md:w-40 md:h-40">
              <AvatarImage src="/profile.jpg" alt="Rajveer Singh" className="object-cover" loading="lazy" />
              <AvatarFallback className="text-3xl bg-muted">RS</AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-muted-foreground"
          >
            <p className="text-lg leading-relaxed">
              IT Operations graduate from RRC Polytech with hands-on experience
              in Active Directory administration, identity and access management,
              and end-user support across enterprise environments.
            </p>
            <p className="text-lg leading-relaxed">
              I'm skilled in user provisioning, security group management, GPOs,
              Exchange administration, and PIM workflows — with a strong focus on
              documentation, troubleshooting, and ITIL-aware service delivery.
            </p>
            <p className="text-lg leading-relaxed">
              On the dev side, I build with React, Node.js, and Python — automating
              workflows and creating tools that bridge IT operations and software development.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
