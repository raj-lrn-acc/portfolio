import { motion } from "framer-motion"

const categories = [
  {
    title: "Identity & Directory",
    skills: ["Active Directory", "Azure AD / Entra ID", "Okta", "LDAP", "Group Policy"],
  },
  {
    title: "Scripting & Automation",
    skills: ["PowerShell", "Python", "Bash", "Ansible", "Terraform"],
  },
  {
    title: "Cloud & Platforms",
    skills: ["Azure", "AWS", "Exchange Online", "Microsoft 365", "SharePoint"],
  },
  {
    title: "Development",
    skills: ["React", "TypeScript", "Node.js", "Python (Flask/Django)", "SQL"],
  },
  {
    title: "Tools & Practices",
    skills: ["Git", "CI/CD", "Docker", "ITIL", "Jira / ServiceNow"],
  },
  {
    title: "Security & Networking",
    skills: ["OAuth / SAML", "Zero Trust", "RBAC", "TLS / SSL", "Firewall Basics"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Skills
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
            >
              <h3 className="font-semibold mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg border bg-card text-card-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
