import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { path: "/", label: "Index", number: "01" },
  { path: "/projects", label: "Projects", number: "02" },
  { path: "/contact", label: "Contact", number: "03" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-80 flex items-center justify-between px-4 sm:px-6 h-16">
        <Link to="/" className="text-sm font-sans font-medium tracking-tight text-foreground/80 hover:text-foreground transition-colors">
          Rajveer<span className="font-serif italic font-light text-pink"> Singh</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-item relative overflow-hidden text-sm font-sans"
              >
                <span className="nav-item-default block transition-all duration-300 text-foreground/70 hover:text-foreground">
                  {link.label}
                </span>
                <span className="nav-item-hover absolute top-0 left-0 font-serif italic text-pink transition-all duration-300">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-secondary/50 transition-colors"
            aria-label="Toggle Menu"
          >
            <svg viewBox="0 0 14 5" className="w-4 h-4" fill="none">
              <circle cx="2.4" cy="2.4" r="2.4" fill={menuOpen ? "transparent" : "currentColor"} />
              <circle cx="11.6" cy="2.4" r="2.4" fill={menuOpen ? "transparent" : "currentColor"} />
            </svg>
            <svg viewBox="0 0 14 14" className="w-4 h-4 absolute" fill="none" style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 0.3s" }}>
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-70 bg-background flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-start gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-4"
                  >
                    <span className="text-xs font-mono text-muted-foreground">
                      {link.number}
                    </span>
                    <span className="text-4xl sm:text-5xl font-serif tracking-tight text-foreground/80 group-hover:text-pink transition-colors">
                      {link.label}
                    </span>
                    <span className="font-serif italic text-lg text-muted-foreground/50 group-hover:text-pink/50 transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sm text-muted-foreground"
            >
              <a href="mailto:rajveercanada2@gmail.com" className="hover:text-foreground transition-colors">
                rajveercanada2@gmail.com
              </a>
              <span>Toronto, Canada</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
