import { useEffect } from "react"

const sections = [
  "hero", "specs", "features", "stack",
  "testimonials", "projects", "changelog", "contact",
] as const

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === "/") {
        e.preventDefault()
        const input = document.querySelector<HTMLInputElement>('#contact input[name="name"]')
        input?.focus()
        return
      }

      const num = Number(e.key)
      if (num >= 1 && num <= sections.length) {
        e.preventDefault()
        const id = sections[num - 1]
        const el = id === "hero" ? document.getElementById("hero") : document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
        else window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])
}
