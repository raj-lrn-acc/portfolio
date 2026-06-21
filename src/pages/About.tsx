import { motion } from "framer-motion"
import { Shield, Terminal, Server, Cpu } from "lucide-react"

const roles = [
  {
    title: "IT Operations Specialist",
    company: "IT Glow",
    period: "Jan 2024 – Present",
    highlights: [
      "Manage IAM workflows for 500+ users across AD and Azure AD",
      "Automated 60% of manual provisioning via PowerShell scripts",
      "Reduced ticket resolution time by 35% through runbooks",
    ],
  },
  {
    title: "IT Support Analyst",
    company: "IT Glow",
    period: "Jun 2022 – Dec 2023",
    highlights: [
      "Tier 1-2 support for identity, access, and authentication",
      "Administered Exchange mailboxes and security groups",
      "ITIL-compliant service desk in Jira Service Management",
    ],
  },
  {
    title: "Junior IT Technician",
    company: "IT Glow",
    period: "Jan 2021 – May 2022",
    highlights: [
      "Onboarded/offboarded users across AD and M365",
      "Configured hardware and software for new hires",
      "Supported MFA rollouts and password-reset workflows",
    ],
  },
]

const education = [
  { degree: "Advanced Diploma, Computer Programming", school: "Canadore College", year: "2020" },
  { degree: "Diploma, Network Administration & Security", school: "CDI College", year: "2018" },
]

export function About() {
  return (
    <div className="pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 md:py-20"
        >
          <p className="text-xs font-medium text-primary tracking-wider uppercase mb-4">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            Rajveer Singh
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            IT Operations graduate from RRC Polytech with hands-on experience in
            Active Directory, IAM, and end-user support. I build automation tools
            that bridge IT operations and software development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden mb-20">
          {[
            { icon: Shield, label: "Identity", value: "AD / Entra ID / PIM" },
            { icon: Terminal, label: "Scripting", value: "PowerShell / Python" },
            { icon: Server, label: "Cloud", value: "Azure / AWS" },
            { icon: Cpu, label: "Development", value: "React / TypeScript / Node" },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="bg-card p-6">
                <Icon className="h-5 w-5 text-primary mb-3" />
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold text-sm">{item.value}</p>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-8">Experience</h2>
            <div className="space-y-8">
              {roles.map((role) => (
                <div key={role.title + role.company}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {role.period}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {role.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-muted-foreground pl-4 relative">
                        <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-full bg-border" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight mb-8">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.degree}>
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.school} &middot; {edu.year}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold tracking-tight mt-12 mb-8">Skills</h2>
            <div className="space-y-4">
              {[
                { category: "Identity & Directory", skills: ["Active Directory", "Azure AD / Entra ID", "Okta", "LDAP", "Group Policy"] },
                { category: "Scripting & Automation", skills: ["PowerShell", "Python", "Bash", "Ansible"] },
                { category: "Development", skills: ["React", "TypeScript", "Node.js", "Python (Flask)"] },
                { category: "Cloud & Platforms", skills: ["Azure", "AWS", "Exchange", "M365"] },
              ].map((group) => (
                <div key={group.category}>
                  <p className="text-xs font-medium text-muted-foreground mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-md border bg-card text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
