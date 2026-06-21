import { motion } from "framer-motion"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-xs font-sans tracking-[0.25em] uppercase text-muted-foreground mb-6"
            >
              Contact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8"
            >
              Say hello
              <br />
              <span className="italic text-muted-foreground">I look forward to hearing from you</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-md leading-relaxed mb-10"
            >
              Have a question, opportunity, or just want to connect? 
              I'm always open to talking about IT, automation, or new projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <a
                href="mailto:rajveercanada2@gmail.com"
                className="group inline-flex items-center gap-3 text-sm font-sans tracking-wider text-foreground/60 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                rajveercanada2@gmail.com
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="inline-flex items-center gap-3 text-sm font-sans tracking-wider text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Toronto, Canada
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
                  className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground text-sm font-sans outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/30"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground text-sm font-sans outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/30"
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                required
                className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground text-sm font-sans outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/30 resize-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-3 text-xs font-sans tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors pt-2"
              >
                <span className="w-8 h-px bg-foreground/30 group-hover:w-12 group-hover:bg-foreground transition-all duration-300" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
