import { motion } from "framer-motion"
import { experiences } from "@/data/experience"

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-2">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Where I've Worked
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                className="relative flex flex-col md:flex-row gap-4 md:gap-8"
              >
                <div className="hidden md:block flex-1" />
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary ring-4 ring-background z-10">
                  <div className="w-full h-full rounded-full bg-primary animate-pulse" />
                </div>
                <div className="flex-1 pl-10 md:pl-0">
                  <span className="inline-block text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full mb-2">
                    {exp.period}
                  </span>
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="text-sm text-primary font-medium">{exp.company}</p>
                  <p className="text-muted-foreground mt-2 leading-relaxed text-sm">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
