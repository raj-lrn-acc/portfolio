import { useEffect, useRef } from "react"
import Lenis from "lenis"

export let scrollProgress = 0
export let scrollVelocity = 0

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
    }
    const handleScroll = (l: any) => {
      scrollProgress = l.progress || 0
      scrollVelocity = l.velocity || 0
    }
    requestAnimationFrame(raf)
    lenis.on("scroll", handleScroll)

    return () => {
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
