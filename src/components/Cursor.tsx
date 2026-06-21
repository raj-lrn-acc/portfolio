import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 20 })
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const over = () => dotRef.current?.classList.add("hovering")
    const out = () => dotRef.current?.classList.remove("hovering")

    window.addEventListener("mousemove", move)
    const interactives = document.querySelectorAll("a, button, input, textarea, [role='button']")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", over)
      el.addEventListener("mouseleave", out)
    })

    document.body.style.cursor = "none"
    const style = document.createElement("style")
    style.textContent = "a, button, input, textarea, [role='button'] { cursor: none !important; }"
    style.id = "cursor-style"
    document.head.appendChild(style)

    return () => {
      document.body.style.cursor = ""
      style.remove()
      window.removeEventListener("mousemove", move)
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", over)
        el.removeEventListener("mouseleave", out)
      })
    }
  }, [cursorX, cursorY])

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block">
      <motion.div
        ref={dotRef}
        style={{ x: springX, y: springY }}
        className="cursor-dot w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
      />
    </div>
  )
}
