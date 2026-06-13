import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Mail, Send, Loader2 } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { toast } from "sonner"

export function Contact() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Message sent!", { description: "I'll get back to you as soon as possible." })
          form.reset()
        } else {
          toast.error("Something went wrong.", { description: "Please try again or email me directly." })
        }
      })
      .catch(() => {
        toast.error("Network error.", { description: "Check your connection and try again." })
      })
      .finally(() => setSubmitting(false))
  }

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
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="name" placeholder="Name" required />
              <Input type="email" name="email" placeholder="Email" required />
            </div>
            <Input name="subject" placeholder="Subject" required />
            <Textarea name="message" placeholder="Message" rows={5} required />
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex md:flex-col gap-4 justify-center"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a href="mailto:rajveercanada2@gmail.com" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Email</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com/Xqni" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">GitHub</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/rajveer-singh-pwgi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">LinkedIn</TooltipContent>
            </Tooltip>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
