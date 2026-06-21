import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

export function Footer() {
  return (
    <footer className="border-t py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} rajveer.dev &mdash; built with ☕ & 💻
        </p>
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <a
              href="https://github.com/Xqni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/rajveer-singh-pwgi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:rajveercanada2@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
