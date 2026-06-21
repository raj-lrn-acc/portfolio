import { GithubIcon, LinkedinIcon } from "@/components/icons"

export function Footer() {
  return (
    <footer className="border-t py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-sans tracking-wider text-muted-foreground uppercase">
          &copy; {new Date().getFullYear()} Rajveer Singh
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Xqni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/60 hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rajveer-singh-pwgi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/60 hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href="mailto:rajveercanada2@gmail.com"
            className="text-muted-foreground/60 hover:text-foreground transition-colors text-xs tracking-wider uppercase"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
