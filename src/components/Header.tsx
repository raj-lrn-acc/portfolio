import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useEffect } from "react"

const navLinks = [
  { path: "/", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
]

export function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-background border-b"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Rajveer<span className="text-primary font-light"> Singh</span>
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm transition-colors",
                location.pathname === link.path
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
