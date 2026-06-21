import { useEffect, useRef } from "react"

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

export function useMouseParallax() {
  const ref = useRef(mouse)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouse, { passive: true })

    const animate = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05
      if (Math.abs(mouse.x - mouse.targetX) > 0.001 || Math.abs(mouse.y - mouse.targetY) > 0.001) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)

    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return ref
}

export { mouse }
