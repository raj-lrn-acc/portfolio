import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "hero", label: "Hero" },
  { id: "specs", label: "Specs" },
  { id: "features", label: "Features" },
  { id: "stack", label: "Stack" },
  { id: "testimonials", label: "Testimonials" },
  { id: "projects", label: "Projects" },
  { id: "changelog", label: "Changelog" },
  { id: "contact", label: "Contact" },
]

export function NavDots() {
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (!el) continue
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id)
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.label}
          className={cn(
            "w-2.5 h-2.5 rounded-full border transition-all duration-300",
            active === s.id
              ? "bg-foreground border-foreground scale-125"
              : "bg-transparent border-muted-foreground/30 hover:border-muted-foreground"
          )}
        />
      ))}
    </nav>
  )
}
