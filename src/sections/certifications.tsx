import { motion } from "framer-motion"
import { certifications } from "@/data/certifications"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, CheckCircle, ExternalLink } from "lucide-react"

const statusConfig = {
  completed: { label: "Completed", icon: CheckCircle, class: "bg-green-500/10 text-green-600 dark:text-green-400" },
  "in-progress": { label: "In Progress", icon: BookOpen, class: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  planned: { label: "Planned", icon: Clock, class: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
}

export function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Learning & Certifications
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => {
            const config = statusConfig[cert.status]
            const Icon = config.icon
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="border rounded-xl p-6 bg-card flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold leading-snug">{cert.name}</h3>
                  <Badge className={`shrink-0 ${config.class} border-0`}>
                    <Icon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                {cert.description && (
                  <p className="text-sm text-muted-foreground/80 leading-relaxed flex-1">{cert.description}</p>
                )}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-4"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Certification details
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
