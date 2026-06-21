import { motion } from "framer-motion"
import { Check, X, Minus } from "lucide-react"

const tiers = [
  {
    name: "Rajveer Lite",
    tag: "v1.0 — Junior Era",
    price: "Free (it was rough)",
    features: [
      { label: "Programming", lite: "HTML/CSS", pro: "TypeScript/React", max: "Full-stack + AI" },
      { label: "IT Ops", lite: "Password resets", pro: "AD / Entra ID / PIM", max: "Architecture design" },
      { label: "Automation", lite: "Batch scripts", pro: "PowerShell / Python", max: "CI/CD pipelines" },
      { label: "Cloud", lite: "Basic Azure", pro: "Azure + AWS", max: "Multi-cloud infra" },
      { label: "Security", lite: "MFA support", pro: "RBAC / Zero Trust", max: "Security architecture" },
      { label: "DevOps", lite: "X", pro: "Git + Docker", max: "K8s + Terraform" },
    ],
  },
  {
    name: "Rajveer Pro",
    tag: "v2.0 — Current Build",
    price: "Market rate (worth it)",
    highlight: true,
    features: [
      { label: "Programming", lite: "HTML/CSS", pro: "TypeScript/React", max: "Full-stack + AI" },
      { label: "IT Ops", lite: "Password resets", pro: "AD / Entra ID / PIM", max: "Architecture design" },
      { label: "Automation", lite: "Batch scripts", pro: "PowerShell / Python", max: "CI/CD pipelines" },
      { label: "Cloud", lite: "Basic Azure", pro: "Azure + AWS", max: "Multi-cloud infra" },
      { label: "Security", lite: "MFA support", pro: "RBAC / Zero Trust", max: "Security architecture" },
      { label: "DevOps", lite: "X", pro: "Git + Docker", max: "K8s + Terraform" },
    ],
  },
  {
    name: "Rajveer Pro Max",
    tag: "v3.0 — Aspirational",
    price: "Priceless (coming soon)",
    features: [
      { label: "Programming", lite: "HTML/CSS", pro: "TypeScript/React", max: "Full-stack + AI" },
      { label: "IT Ops", lite: "Password resets", pro: "AD / Entra ID / PIM", max: "Architecture design" },
      { label: "Automation", lite: "Batch scripts", pro: "PowerShell / Python", max: "CI/CD pipelines" },
      { label: "Cloud", lite: "Basic Azure", pro: "Azure + AWS", max: "Multi-cloud infra" },
      { label: "Security", lite: "MFA support", pro: "RBAC / Zero Trust", max: "Security architecture" },
      { label: "DevOps", lite: "X", pro: "Git + Docker", max: "K8s + Terraform" },
    ],
  },
]

function Cell({ value }: { value: string }) {
  if (value === "X") return <X className="h-4 w-4 text-destructive mx-auto" />
  if (value === "✓") return <Check className="h-4 w-4 text-neon-green mx-auto" />
  if (value === "—" || value === "-") return <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
  return <span className="text-xs font-mono">{value}</span>
}

export function Stack() {
  return (
    <section id="stack" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">// tech stack comparison</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Choose Your Developer
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            {`/* Features vary by version. Upgrade anytime. */`}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden mt-10">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-card p-6 sm:p-8 relative ${
                tier.highlight
                  ? "ring-2 ring-primary ring-inset md:-mx-px md:scale-105 z-10 shadow-lg shadow-primary/10"
                  : ""
              }`}
            >
              {tier.highlight && (
                <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                  RECOMMENDED
                </span>
              )}
              <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
              <p className="text-xs font-mono text-muted-foreground mb-2">{tier.tag}</p>
              <p className="text-sm font-mono text-primary mb-6">{tier.price}</p>

              <div className="space-y-0">
                {tier.features.map((f) => (
                  <div
                    key={f.label}
                    className="grid grid-cols-4 gap-2 py-3 border-b border-border last:border-0 text-center"
                  >
                    <div className="text-xs text-muted-foreground text-left col-span-1">{f.label}</div>
                    <Cell value={f.lite} />
                    <Cell value={f.pro} />
                    <Cell value={f.max} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs font-mono text-muted-foreground/50 text-center mt-4">
          * Based on self-reported data. Results may vary. Batteries not included.
        </p>
      </div>
    </section>
  )
}
