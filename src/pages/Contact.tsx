import { useState } from "react"
import { motion } from "framer-motion"
import { Footer } from "@/components/Footer"

export default function Contact() {
  const [mode, setMode] = useState<"business" | "general">("business")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = mode === "business" ? "New Business Inquiry" : "General Inquiry"
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`
    window.open(`mailto:rajveercanada2@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`, "_blank")
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <main className="relative pt-32 pb-12">
      <div className="px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
            Contact
          </p>
          <h1 className="text-5xl sm:text-7xl font-serif tracking-tight leading-[0.9] mb-6">
            Get in touch
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans">
                Location
              </h3>
              <p className="text-sm font-sans leading-relaxed">
                Toronto, Ontario
                <br />
                Canada
              </p>
            </div>
            <div>
              <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans">
                Email
              </h3>
              <a
                href="mailto:rajveercanada2@gmail.com"
                className="text-sm text-pink hover:underline underline-offset-4 font-sans"
              >
                rajveercanada2@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans">
                GitHub
              </h3>
              <a
                href="https://github.com/Xqni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-pink hover:underline underline-offset-4 font-sans"
              >
                github.com/Xqni
              </a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3"
          >
            {/* Toggle */}
            <div className="flex items-center gap-0 mb-8 border border-border rounded-full overflow-hidden w-fit">
              <button
                onClick={() => setMode("business")}
                className={`px-5 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
                  mode === "business" ? "bg-foreground text-background" : "bg-transparent text-muted-foreground"
                }`}
              >
                New Business
              </button>
              <button
                onClick={() => setMode("general")}
                className={`px-5 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
                  mode === "general" ? "bg-foreground text-background" : "bg-transparent text-muted-foreground"
                }`}
              >
                General
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-border pb-3 text-sm font-sans text-foreground placeholder:text-muted-foreground outline-none focus:border-pink transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-border pb-3 text-sm font-sans text-foreground placeholder:text-muted-foreground outline-none focus:border-pink transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder={mode === "business" ? "Tell me about your project..." : "Your message..."}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-border pb-3 text-sm font-sans text-foreground placeholder:text-muted-foreground outline-none focus:border-pink transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 bg-pink text-background px-8 py-3 text-xs font-medium uppercase tracking-wider rounded-full hover:opacity-90 transition-all"
              >
                {sent ? "✓ Sent" : mode === "business" ? "Submit Brief" : "Send Message"}
                {!sent && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M1 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  )
}
