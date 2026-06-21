import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "He automated 60% of our provisioning. Now I automate my coffee breaks. We are so cooked.",
    author: "Edan K.",
    role: "IT Manager at IT Glow",
    rating: 5,
    avatar: "EK",
    color: "text-neon-cyan",
  },
  {
    quote: "Bro fixed our Exchange server with one line of PowerShell. ONE LINE. I've been doing this for 15 years.",
    author: "Priya K.",
    role: "Senior Infrastructure Engineer",
    rating: 5,
    avatar: "PK",
    color: "text-neon-green",
  },
  {
    quote: "I asked him to restart the server. He wrote a Python script for it. Then he automated the script. Then he deployed it. I just wanted a reboot.",
    author: "Jamie R.",
    role: "Director of IT Operations",
    rating: 5,
    avatar: "JR",
    color: "text-neon-magenta",
  },
  {
    quote: "His PowerShell scripts are so clean I almost cried. Almost. I'm a professional.",
    author: "Jules M.",
    role: "DevOps Lead, Waterloo Co.",
    rating: 5,
    avatar: "JM",
    color: "text-neon-cyan",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">// social proof</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
            People All Around the World Love Rajveer
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            {`/* Do not take our word for it. See what people say. */`}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="border rounded-2xl p-6 sm:p-8 bg-card relative group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold ${t.color}`}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
