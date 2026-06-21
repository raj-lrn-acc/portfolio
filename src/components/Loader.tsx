import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const letters = ["U", "N", "S", "E", "N", "E"]

export function Loader({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [eyes, setEyes] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 100))
    }, 400)
    const t2 = setTimeout(() => {
      clearInterval(t)
      setProgress(100)
    }, 3000)

    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      setEyes({
        lx: Math.min(Math.max(dx * 6, -6), 6),
        ly: Math.min(Math.max(dy * 3, -3), 3),
        rx: Math.min(Math.max(dx * 6, -6), 6),
        ry: Math.min(Math.max(dy * 3, -3), 3),
      })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => {
      clearInterval(t)
      clearTimeout(t2)
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [])

  const handleEnter = useCallback(() => {
    setVisible(false)
    setTimeout(onEnter, 800)
  }, [onEnter])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[12000] bg-background flex flex-col items-center justify-center select-none"
          ref={containerRef}
        >
          <div className="flex flex-col items-center relative">
            <div className="perspective-[32rem] mb-4">
              <div className="loader-box">
                {letters.map((l, i) => (
                  <div key={i} className="loader-box-face font-serif font-light">
                    {l}
                  </div>
                ))}
              </div>
            </div>

            <span className="text-sm tracking-tight uppercase mb-1 font-sans" style={{ color: "#424242" }}>
              Rajveer Singh&reg;
            </span>
            <p className="text-sm leading-snug mb-7 text-center max-w-xs font-sans" style={{ color: "#424242", letterSpacing: "-0.025rem" }}>
              Enterprise infrastructure.
              <br />
              IAM, automation &amp; full-stack.
            </p>

            {progress < 100 ? (
              <div className="w-48 h-px bg-border relative overflow-hidden">
                <motion.div
                  className="h-full bg-pink absolute top-0 left-0"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="flex flex-col items-center gap-4"
              >
                <button
                  onClick={handleEnter}
                  className="relative text-xs font-medium uppercase tracking-wider text-foreground/60 hover:text-foreground bg-transparent border-0 py-1 transition-colors duration-300"
                >
                  Enter without audio
                </button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
                  onClick={handleEnter}
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-pink text-background text-xs font-medium uppercase tracking-wider rounded-full hover:opacity-85 transition-all duration-300"
                >
                  Enter
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>

                <p className="text-[10px] text-muted-foreground/40 mt-1 font-sans tracking-widest uppercase">
                  Click or press any key
                </p>
              </motion.div>
            )}
          </div>

          {/* Animated eyes SVG */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48">
            <svg viewBox="0 0 311.3 233.3" className="w-full opacity-15">
              <defs>
                <clipPath id="ml"><path d="M139.5,101.5c2.5-7.8,6-14.8,10.3-21c-3.8-11.2-11.1-19-20.6-22c-2.8-0.9-5.6-1.3-8.5-1.3c-7,0-14.2,2.5-21,7.5C89.8,71.3,82.2,82.4,78,95.5c-4.1,13.1-4.3,26.5-0.4,37.9c3.8,11.2,11.1,19,20.6,22c9.4,3,19.9,0.8,29.5-6.1c3.5-2.5,6.7-5.6,9.6-9.1C134.6,128,135.3,114.6,139.5,101.5z"/></clipPath>
                <clipPath id="mr"><path d="M206,58.9c-3.8-1.2-7.6-1.8-11.4-1.8c-21.7,0-43.6,18.2-52.2,45.3c-4.9,15.5-4.8,31.6,0.3,45.3c5.1,13.6,14.5,23.1,26.6,27c12,3.8,25.3,1.4,37.2-6.7c12.1-8.2,21.5-21.3,26.4-36.8C243,99.2,230.9,66.8,206,58.9z"/></clipPath>
              </defs>
              <ellipse cx="113.6" cy="106.8" rx="52.5" ry="38.8" fill="none" stroke="#3a3a3a" strokeWidth="2" />
              <ellipse cx="187.6" cy="116.8" rx="62.3" ry="49" fill="none" stroke="#3a3a3a" strokeWidth="2" />
              <g clipPath="url(#ml)">
                <circle cx={113.6 + eyes.lx} cy={106.8 + eyes.ly} r="18" fill="none" stroke="#3a3a3a" strokeWidth="2" />
                <circle cx={120 + eyes.lx} cy={115 + eyes.ly} r="5" fill="#3a3a3a" />
              </g>
              <g clipPath="url(#mr)">
                <circle cx={187.6 + eyes.rx} cy={116.8 + eyes.ry} r="22" fill="none" stroke="#3a3a3a" strokeWidth="2" />
                <circle cx={195 + eyes.rx} cy={125 + eyes.ry} r="6" fill="#3a3a3a" />
              </g>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
