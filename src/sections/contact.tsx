import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Send, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">// deploy message</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            Deploy Message
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            {`/* Ready to ship? Send a payload. I'll respond within 24-48 business hours. */`}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="border rounded-2xl overflow-hidden bg-card">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/30">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-neon-green/60" />
                <span className="text-xs font-mono text-muted-foreground ml-2">
                  contact.sh
                </span>
              </div>
              <form
                action="https://formspree.io/f/your-form-id"
                method="POST"
                className="p-6 space-y-4 font-mono text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-muted-foreground">./send-message.sh --name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="your_name"
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow font-mono"
                />
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-muted-foreground">./send-message.sh --email</span>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow font-mono"
                />
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-muted-foreground">cat &gt; message.txt</span>
                </div>
                <textarea
                  name="message"
                  placeholder="Your message here..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow font-mono resize-none"
                />
                <Button type="submit" className="w-full rounded-xl font-mono text-sm gap-2 h-11">
                  <Send className="h-4 w-4" />
                  Send Message &gt;&gt;
                </Button>
                <p className="text-[10px] text-muted-foreground/50 text-center">
                  Exit code: 0 (success) | Response time: O(n) where n = business days
                </p>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center gap-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a question, opportunity, or just want to say hi? Drop a message.
              I'm always open to talking about IT, automation, or new projects.
            </p>

            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:rajveercanada2@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  rajveercanada2@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <GithubIcon className="h-4 w-4 text-primary" />
                <a
                  href="https://github.com/Xqni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  github.com/Xqni
                </a>
              </div>
              <div className="flex items-center gap-3">
                <LinkedinIcon className="h-4 w-4 text-primary" />
                <a
                  href="https://www.linkedin.com/in/rajveer-singh-pwgi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  linkedin.com/in/rajveer-singh-pwgi
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
