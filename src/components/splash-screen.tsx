import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const letters = "RAJVEER SINGH".split("")

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [started, setStarted] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [])

  const handleEnter = () => {
    setVisible(false)
    setTimeout(onEnter, 800)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          <div className="text-center px-6">
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif tracking-[0.15em] leading-relaxed mb-12 sm:mb-16 md:mb-20">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={
                    started
                      ? { opacity: 1, y: 0, rotateX: 0 }
                      : { opacity: 0, y: 40, rotateX: -20 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`inline-block ${letter === " " ? "w-[0.3em]" : ""}`}
                  style={{ transformStyle: "preserve-3d", perspective: "800px" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={started ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-sm sm:text-base font-sans text-muted-foreground tracking-wider uppercase mb-10"
            >
              IT Operations &middot; IAM &middot; Automation
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              onClick={handleEnter}
              className="group relative inline-flex items-center gap-3 text-sm sm:text-base font-sans tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              <span className="w-8 h-px bg-foreground/30 group-hover:w-12 group-hover:bg-foreground transition-all duration-300" />
              Enter
              <span className="w-8 h-px bg-foreground/30 group-hover:w-12 group-hover:bg-foreground transition-all duration-300" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
