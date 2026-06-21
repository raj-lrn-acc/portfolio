import { motion } from "framer-motion"
import { Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Connect
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 mb-6">
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
            Have a question, opportunity, or just want to say hi? I'm always open
            to talking about IT, automation, or new projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full border">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <a
                  href="mailto:hello@rajveer.dev"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@rajveer.dev
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full border">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">Toronto, Canada</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t pt-10">
            <form
              action="https://formspree.io/f/your-form-id"
              method="POST"
              className="max-w-lg space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
              />
              <Button type="submit" className="rounded-full px-8">
                Send Message
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
