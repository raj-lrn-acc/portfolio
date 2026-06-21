import { motion } from "framer-motion"
import { GitCommit, Tag } from "lucide-react"

const versions = [
  {
    version: "v3.0.0",
    date: "June 2026",
    tag: "Full-Stack Dev Mode Unlocked",
    type: "major",
    notes: [
      "Added full-stack development capabilities (React, TypeScript, Node.js)",
      "Integrated LLM tool-calling agent (Qwen3:8b via Ollama)",
      "Automated 60% of IAM provisioning workflows",
      "Achieved 94.7% first-pass bug squash rate",
    ],
  },
  {
    version: "v2.1.0",
    date: "Jan 2024",
    tag: "The PowerShell Expansion",
    type: "minor",
    notes: [
      "Added advanced PowerShell scripting module",
      "Reduced ticket resolution time by 35%",
      "Implemented runbook documentation system",
      "Migrated to Entra ID PIM workflows",
    ],
  },
  {
    version: "v2.0.0",
    date: "Jun 2022",
    tag: "IT Operations Overhaul",
    type: "major",
    notes: [
      "Promoted to IT Operations Specialist",
      "Managed IAM for 500+ users across AD + Azure AD",
      "Deployed Exchange shared mailboxes & distribution groups",
      "ITIL-compliant service desk operations",
    ],
  },
  {
    version: "v1.1.0",
    date: "Jan 2021",
    tag: "The Junior Patch",
    type: "minor",
    notes: [
      "Onboarded/offboarded users across AD + M365",
      "Configured hardware/software for new hires",
      "Supported MFA rollout and password-reset workflows",
    ],
  },
  {
    version: "v1.0.0",
    date: "Sep 2020",
    tag: "Initial Deployment",
    type: "major",
    notes: [
      "First commit — IT Support Intern at IGT",
      "Helpdesk support for hardware and software",
      "Network troubleshooting and system imaging",
      "Started the journey",
    ],
  },
]

export function Changelog() {
  return (
    <section id="changelog" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">// release history</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Changelog
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            {`/* Career releases. Semantic versioning. No breaking changes (mostly). */`}
          </p>
        </motion.div>

        <div className="relative mt-10">
          <div className="absolute left-[13px] top-3 bottom-3 w-px bg-border hidden sm:block" />

          <div className="space-y-8">
            {versions.map((v, idx) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="relative pl-0 sm:pl-10"
              >
                <div className="hidden sm:block absolute left-[7px] top-[6px]">
                  {v.type === "major" ? (
                    <Tag className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <GitCommit className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>

                <div className="border rounded-xl p-5 sm:p-6 bg-card hover:border-primary/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <span
                      className={`font-mono text-sm font-bold ${
                        v.type === "major" ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {v.version}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{v.date}</span>
                    <span className="text-xs font-mono text-muted-foreground/50">&mdash;</span>
                    <span className="text-sm font-semibold">{v.tag}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {v.notes.map((note, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-[3px] shrink-0">*</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
