import { useEffect } from "react"

export const mouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
}

export const drag = {
  isDragging: false,
  velocityY: 0,
  velocityX: 0,
  rotationX: 0,
  rotationY: 0,
}

export function useMouseParallax() {
  useEffect(() => {
    let raf: number | null = null
    let prevX = 0
    let prevY = 0

    const handleMouse = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
      if (drag.isDragging) {
        const dx = e.clientX - prevX
        const dy = e.clientY - prevY
        drag.rotationY += dx * 0.005
        drag.rotationX += dy * 0.005
        drag.velocityX = dx * 0.3
        drag.velocityY = dy * 0.3
      }
      prevX = e.clientX
      prevY = e.clientY
    }

    const handleDown = (e: PointerEvent) => {
      if (e.target instanceof HTMLCanvasElement) {
        drag.isDragging = true
        drag.velocityX = 0
        drag.velocityY = 0
      }
    }

    const handleUp = () => {
      drag.isDragging = false
    }

    const tick = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      if (!drag.isDragging) {
        drag.velocityX *= 0.9
        drag.velocityY *= 0.9
        drag.rotationY += drag.velocityX * 0.002
        drag.rotationX += drag.velocityY * 0.002
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener("mousemove", handleMouse, { passive: true })
    window.addEventListener("pointerdown", handleDown)
    window.addEventListener("pointerup", handleUp)

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("pointerdown", handleDown)
      window.removeEventListener("pointerup", handleUp)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}
