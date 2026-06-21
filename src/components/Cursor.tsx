import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 200, damping: 25 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 25 })
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const scale = useMotionValue(1)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const over = () => {
      dotRef.current?.classList.add("hovering")
      scale.set(1.8)
    }
    const out = () => {
      dotRef.current?.classList.remove("hovering")
      scale.set(1)
    }

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
  }, [cursorX, cursorY, scale])

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block">
      <motion.div
        ref={ringRef}
        style={{ x: springX, y: springY }}
        className="-translate-x-1/2 -translate-y-1/2 absolute w-8 h-8 rounded-full border border-foreground/30"
        animate={{ scale: 1 }}
      />
      <motion.div
        ref={dotRef}
        style={{ x: springX, y: springY, scale }}
        className="cursor-dot w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground absolute"
      />
    </div>
  )
}
