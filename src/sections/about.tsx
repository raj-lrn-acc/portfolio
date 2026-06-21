import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="about" className="py-32 md:py-40 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-sans tracking-[0.25em] uppercase text-muted-foreground mb-6"
            >
              About
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight"
            >
              Bridging IT operations
              <br />
              <span className="italic text-muted-foreground">and code</span>
            </motion.h2>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed"
            >
              IT Operations graduate from RRC Polytech with hands-on experience
              in Active Directory administration, identity and access management,
              and end-user support across enterprise environments.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg leading-relaxed"
            >
              I manage IAM workflows for 500+ users, automate provisioning with
              PowerShell and Python, and build full-stack tools with React and
              Node.js — bridging the gap between traditional IT operations and
              modern software delivery.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg leading-relaxed"
            >
              Currently at IT Glow, I reduced ticket resolution times by 35%
              through automation and documentation, and designed PowerShell
              workflows that cut manual provisioning by 60%.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
