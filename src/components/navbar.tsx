import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    const sections = navLinks.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sections.forEach((s) => observer.observe(s))
    window.addEventListener("scroll", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect() }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16 sm:h-20">
        <a href="#" className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors">
          Rajveer Singh
        </a>
        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs tracking-[0.15em] uppercase transition-colors",
                activeSection === link.href.slice(1)
                  ? "text-foreground"
                  : "text-foreground/40 hover:text-foreground/70"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
