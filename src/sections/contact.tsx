import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Looking for an IT professional? Let's connect — I'm always open
            to new opportunities and conversations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto] gap-12 max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            action="https://formspree.io/f/xqeozbpy"
            method="POST"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="name" placeholder="Name" required />
              <Input type="email" name="email" placeholder="Email" required />
            </div>
            <Input name="subject" placeholder="Subject" required />
            <Textarea name="message" placeholder="Message" rows={5} required />
            <Button type="submit" className="w-full">
              <Send className="h-4 w-4" />
              Send Message
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex md:flex-col gap-4 justify-center"
          >
            <Button variant="outline" size="icon" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = 'mailto:' + atob('cmFqdmVlcmNhbmFkYTJAZ21haWwuY29t') }} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/Xqni" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://www.linkedin.com/in/rajveer-singh-pwgi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Rajveer Singh. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
