import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const headline = "IT Operations\n& Software Engineering"

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-muted-foreground mb-6 sm:mb-8">
            Identity & Access Management &mdash; Automation &mdash; Full-Stack
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.05] sm:leading-[1.05] tracking-tight mb-8 sm:mb-10">
            {headline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line.split("").map((char, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 8 + j * 0.015,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl font-sans leading-relaxed"
          >
            I bridge enterprise IT operations with modern software development.
            Active Directory, IAM, automation, and full-stack tools that
            streamline how organizations manage identity and access.
          </motion.p>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  )
}
