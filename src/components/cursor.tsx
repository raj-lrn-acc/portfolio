import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 200, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 30 })
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const overLink = () => innerRef.current?.classList.add("scale-150", "opacity-50", "mix-blend-difference")
    const outLink = () => innerRef.current?.classList.remove("scale-150", "opacity-50", "mix-blend-difference")

    window.addEventListener("mousemove", move)
    document.querySelectorAll("a, button, input, textarea, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", overLink)
      el.addEventListener("mouseleave", outLink)
    })

    return () => {
      window.removeEventListener("mousemove", move)
    }
  }, [cursorX, cursorY])

  return (
    <div id="cursor" className="fixed top-0 left-0 pointer-events-none z-[99] hidden md:block">
      <motion.div
        ref={innerRef}
        style={{ x: springX, y: springY }}
        className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground transition-all duration-200"
      />
    </div>
  )
}
