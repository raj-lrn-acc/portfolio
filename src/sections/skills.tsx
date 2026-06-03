import { motion } from "framer-motion"
import { skills, categoryLabels } from "@/data/skills"
import type { Skill } from "@/data/skills"

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}/5</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </div>
  )
}

const categories = ["frontend", "backend", "platforms", "tools", "ai"] as const

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-2">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Tech Stack
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: catIdx * 0.08 }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-5">
                {categoryLabels[category]}
              </h3>
              <div className="space-y-3">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
