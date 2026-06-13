import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { ArrowUp, Mail } from "lucide-react"

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="border-t py-12 px-6 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-sm tracking-tight mb-3">Rajveer Singh</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              IT Operations professional focused on IAM, Active Directory, and automation. Winnipeg-based.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-tight mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-tight mb-3">Connect</h3>
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
        <div className="flex items-center justify-between mt-10 pt-6 border-t text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rajveer Singh. All rights reserved.</p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
            className="hover:text-foreground transition-colors flex items-center gap-1"
            aria-label="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Top
          </a>
        </div>
      </div>
    </footer>
  )
}
