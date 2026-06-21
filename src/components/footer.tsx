import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-16 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10">
          <div>
            <h3 className="text-sm font-semibold tracking-tight mb-4">Rajveer Singh</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              IT Operations &amp; Software Engineering. IAM, Active Directory, automation, and full-stack development.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight mb-4">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/Xqni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rajveer-singh-pwgi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="mailto:rajveercanada2@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                rajveercanada2@gmail.com
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight mb-4">Location</h3>
            <p className="text-sm text-muted-foreground">Toronto, Canada</p>
            <p className="text-sm text-muted-foreground mt-3">Available for remote/hybrid opportunities</p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rajveer Singh. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
