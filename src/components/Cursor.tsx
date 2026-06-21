import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 28 })
  const sy = useSpring(y, { stiffness: 600, damping: 28 })
  const dotRef = useRef<HTMLDivElement>(null)
  const scale = useMotionValue(1)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const over = () => scale.set(2.2)
    const out = () => scale.set(1)

    window.addEventListener("mousemove", move, { passive: true })

    const els = document.querySelectorAll("a, button, input, textarea, [role='button']")
    els.forEach((el) => {
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
      els.forEach((el) => {
        el.removeEventListener("mouseenter", over)
        el.removeEventListener("mouseleave", out)
      })
    }
  }, [x, y, scale])

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block">
      <motion.div
        ref={dotRef}
        style={{ x: sx, y: sy, scale }}
        className="-translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink"
      />
      <motion.div
        style={{ x: sx, y: sy }}
        className="-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-pink/30 absolute"
      />
    </div>
  )
}
