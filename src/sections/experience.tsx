import { motion } from "framer-motion"

const roles = [
  {
    title: "IT Operations Specialist",
    company: "IT Glow",
    period: "Jan 2024 – Present",
    highlights: [
      "Manage IAM workflows for 500+ users across AD and Azure AD",
      "Automated 60% of manual provisioning tasks via PowerShell scripts",
      "Reduced ticket resolution time by 35% through documentation and runbooks",
    ],
  },
  {
    title: "IT Support Analyst",
    company: "IT Glow",
    period: "Jun 2022 – Dec 2023",
    highlights: [
      "Tier 1-2 support for identity, access, and authentication issues",
      "Administered Exchange shared mailboxes, distribution groups, and security groups",
      "Maintained ITIL-compliant service desk operations in Jira Service Management",
    ],
  },
  {
    title: "Junior IT Technician",
    company: "IT Glow",
    period: "Jan 2021 – May 2022",
    highlights: [
      "Onboarded/offboarded users across AD and Microsoft 365",
      "Configured hardware and software for new hires",
      "Supported MFA rollouts and password-reset workflows",
    ],
  },
  {
    title: "Technical Support Intern",
    company: "IGT",
    period: "Sep 2020 – Dec 2020",
    highlights: [
      "Provided helpdesk support for hardware and software issues",
      "Assisted with network troubleshooting and system imaging",
    ],
  },
]

const education = [
  { degree: "Advanced Diploma, Computer Programming", school: "Canadore College", year: "2020" },
  { degree: "Diploma, Network Administration & Security", school: "CDI College", year: "2018" },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Career
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Experience
          </h2>
        </motion.div>

        <div className="space-y-10">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title + role.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.company}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {role.period}
                </span>
              </div>
              <ul className="space-y-1.5">
                {role.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-muted-foreground pl-4 relative">
                    <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-border" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Education
          </span>
          <div className="mt-4 space-y-4">
            {education.map((edu) => (
              <div key={edu.degree}>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.school} &middot; {edu.year}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
