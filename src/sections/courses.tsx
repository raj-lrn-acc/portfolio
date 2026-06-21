import { motion } from "framer-motion"
import { courses } from "@/data/courses"
import { GraduationCap } from "lucide-react"

export function Courses() {
  return (
    <section id="courses" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Study
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Self-Study Courses
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={course.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="border rounded-xl p-6 bg-card"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5" />
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
