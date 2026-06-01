import { motion } from "framer-motion"
import { courses } from "@/data/courses"
import { GraduationCap } from "lucide-react"

export function Courses() {
  return (
    <section id="courses" className="py-16 md:py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-2">
            Courses
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Self-Study
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={course.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
              className="border rounded-xl p-6 bg-card"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs font-mono text-muted-foreground mb-1">{course.code}</p>
              <h3 className="font-semibold leading-snug mb-2">{course.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{course.platform}</p>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">{course.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
