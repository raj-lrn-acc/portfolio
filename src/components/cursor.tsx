import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 200, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 30 })
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.cursor = "none"
    const style = document.createElement("style")
    style.textContent = "a, button, input, textarea, [role='button'] { cursor: none !important; }"
    style.id = "cursor-hide-style"
    document.head.appendChild(style)

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const overLink = () => innerRef.current?.classList.add("scale-[2.5]", "opacity-50")
    const outLink = () => innerRef.current?.classList.remove("scale-[2.5]", "opacity-50")

    window.addEventListener("mousemove", move)

    const interactives = document.querySelectorAll("a, button, input, textarea, [role='button']")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", overLink)
      el.addEventListener("mouseleave", outLink)
    })

    return () => {
      document.body.style.cursor = ""
      style.remove()
      window.removeEventListener("mousemove", move)
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", overLink)
        el.removeEventListener("mouseleave", outLink)
      })
    }
  }, [cursorX, cursorY])

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[99] hidden md:block">
      <motion.div
        ref={innerRef}
        style={{ x: springX, y: springY }}
        className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground transition-all duration-200 ease-out"
      />
    </div>
  )
}
