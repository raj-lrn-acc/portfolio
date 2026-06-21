import { useEffect } from "react"

export const pointer = { x: 0, y: 0, dx: 0, dy: 0 }

export function usePointer() {
  useEffect(() => {
    let prevX = 0
    let prevY = 0

    const handle = (e: MouseEvent) => {
      pointer.dx = e.clientX - prevX
      pointer.dy = e.clientY - prevY
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
      prevX = e.clientX
      prevY = e.clientY
    }
    window.addEventListener("mousemove", handle, { passive: true })
    return () => window.removeEventListener("mousemove", handle)
  }, [])
}
