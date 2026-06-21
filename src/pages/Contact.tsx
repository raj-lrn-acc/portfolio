import { motion } from "framer-motion"
import { Mail, MapPin } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <div className="pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium text-primary tracking-wider uppercase mb-4">
              Contact
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Say hello
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-10">
              Have a question, opportunity, or just want to connect?
              I'm always open to talking about IT, automation, or new projects.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full border bg-card">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:rajveercanada2@gmail.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    rajveercanada2@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full border bg-card">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Toronto, Canada</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full border bg-card">
                  <GithubIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">GitHub</p>
                  <a
                    href="https://github.com/Xqni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    github.com/Xqni
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full border bg-card">
                  <LinkedinIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/rajveer-singh-pwgi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    linkedin.com/in/rajveer-singh-pwgi
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              action="https://formspree.io/f/your-form-id"
              method="POST"
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow"
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
              />
              <Button type="submit" className="rounded-full px-8">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
