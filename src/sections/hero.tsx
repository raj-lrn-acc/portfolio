import { motion } from "framer-motion"
import { FileDown, ArrowRight } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const badges = [
  "Active Directory",
  "IAM",
  "Exchange",
  "PowerShell",
  "Python",
  "React",
]

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {badges.map((badge) => (
              <span
                key={badge}
                className="text-xs font-medium px-3 py-1 rounded-full border bg-secondary/50 text-secondary-foreground"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            Rajveer
            <br />
            <span className="text-muted-foreground">Singh</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            IT Operations professional specializing in identity & access
            management, Active Directory, and automation. I build tools
            and streamline workflows for enterprise IT.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild className="rounded-full px-6">
              <a href="#projects">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6">
              <a
                href="/Rajveer_Singh_Resume.pdf"
                download
                onClick={() => toast("Downloading resume...")}
              >
                <FileDown className="h-4 w-4" />
                Resume
              </a>
            </Button>
            <div className="flex gap-3 ml-2">
              <a
                href="https://github.com/Xqni"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rajveer-singh-pwgi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
