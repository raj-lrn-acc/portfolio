import { motion } from "framer-motion"
import { ArrowDown, Mail, FileDown } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center"
      >
        <p className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">
          IT Operations
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Hi, I'm{" "}
          <span className="text-primary">Rajveer</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed px-4">
          IT Operations graduate with hands-on experience in Active Directory,
          IAM, and technical support. I build tools and automate workflows
          to make enterprise IT run smoother.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap px-4">
          <Button asChild className="w-full sm:w-auto">
            <a href="#projects">View Projects</a>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <a href="#contact">Get in Touch</a>
          </Button>
          <Button variant="secondary" asChild className="w-full sm:w-auto">
            <a href="/Rajveer_Singh_Resume.pdf" download>
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8"
      >
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="h-5 w-5 text-muted-foreground animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}
