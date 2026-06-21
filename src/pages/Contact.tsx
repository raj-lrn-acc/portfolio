import { useState } from "react"
import { motion } from "framer-motion"
import { Footer } from "@/components/Footer"

const ease = [0.25, 0.1, 0.25, 1] as const

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
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4 font-sans">Contact</p>
          <h1 className="text-5xl sm:text-7xl font-serif tracking-tight leading-[0.9] text-white mb-6">Get in touch</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xs tracking-widest uppercase text-white/40 mb-2 font-sans">Location</h3>
              <p className="text-sm text-white/70 font-sans leading-relaxed">Toronto, Ontario<br />Canada</p>
            </div>
            <div>
              <h3 className="text-xs tracking-widest uppercase text-white/40 mb-2 font-sans">Email</h3>
              <a href="mailto:rajveercanada2@gmail.com" className="text-sm text-pink hover:underline underline-offset-4 font-sans">rajveercanada2@gmail.com</a>
            </div>
            <div>
              <h3 className="text-xs tracking-widest uppercase text-white/40 mb-2 font-sans">GitHub</h3>
              <a href="https://github.com/Xqni" target="_blank" rel="noopener noreferrer" className="text-sm text-pink hover:underline underline-offset-4 font-sans">github.com/Xqni</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="md:col-span-3"
          >
            <div className="flex items-center gap-0 mb-8 border border-white/20 rounded-full overflow-hidden w-fit">
              <button
                onClick={() => setMode("business")}
                className={`px-5 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
                  mode === "business" ? "bg-pink text-background" : "bg-transparent text-white/50"
                }`}
              >
                New Business
              </button>
              <button
                onClick={() => setMode("general")}
                className={`px-5 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
                  mode === "general" ? "bg-pink text-background" : "bg-transparent text-white/50"
                }`}
              >
                General
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-white placeholder:text-white/30 outline-none focus:border-pink transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-white placeholder:text-white/30 outline-none focus:border-pink transition-colors"
              />
              <textarea
                placeholder={mode === "business" ? "Tell me about your project..." : "Your message..."}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-white placeholder:text-white/30 outline-none focus:border-pink transition-colors resize-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 bg-pink text-background px-8 py-3 text-xs font-medium uppercase tracking-wider rounded-full hover:opacity-85 transition-all duration-300"
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
      <div className="mt-32"><Footer /></div>
    </main>
  )
}
