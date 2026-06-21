import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

const phrases = [
  "const dev = new FullStackEngineer();",
  "IAM. AD. PowerShell. Repeat.",
  "deploy --prod --confidence=high",
  "git commit -m \"fixed it fr this time\"",
  "while(true) { code.eat().sleep(); }",
  "System.Out.println(\"Hello, World!\");",
  "Automating your IT since 2021",
]

export function Hero() {
  const [typed, setTyped] = useState("")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setTyped(current.slice(0, charIdx + 1))
        setCharIdx(charIdx + 1)
      }, 60)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setTyped(current.slice(0, charIdx - 1))
        setCharIdx(charIdx - 1)
      }, 30)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx((phraseIdx + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  useEffect(() => {
    const t = setTimeout(() => setShowScroll(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--neon-cyan)_0%,_transparent_50%)] opacity-10 dark:opacity-20" />

      <div className="max-w-6xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card/50 text-xs font-mono text-muted-foreground mb-8">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span className="text-primary font-semibold">rajveer</span>
            <span className="text-muted-foreground">@</span>
            <span className="text-primary">dev</span>
            <span className="text-muted-foreground">:~$</span>
            <span className="animate-pulse">_</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.85] mb-4">
            Rajveer
            <br />
            <span className="text-primary">Singh</span>
          </h1>

          <div className="h-8 sm:h-10 flex items-center gap-1.5 mb-8">
            <span className="text-primary font-mono text-sm">$</span>
            <span className="text-lg sm:text-xl font-mono text-muted-foreground">
              {typed}
            </span>
            <span className="w-[2px] h-5 bg-foreground animate-[blink_1s_step-end_infinite]" />
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            IT Operations by day. Code by night. I bridge IAM, Active Directory,
            and automation — building tools that turn chaos into CI/CD.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild className="rounded-full px-8 gap-2 font-mono text-sm">
              <a href="#projects">
                <span className="text-primary-foreground">View Projects</span>
                <span className="text-primary-foreground/60">~$</span>
              </a>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-8 font-mono text-sm">
              <a href="#contact">Contact &gt;&gt;</a>
            </Button>
          </div>
        </motion.div>
      </div>

      {showScroll && (
        <motion.a
          href="#specs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-mono">Scroll to continue</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      )}
    </section>
  )
}
