import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Analytics } from "@vercel/analytics/react"
import { Navbar } from "@/components/navbar"
import { BackToTop } from "@/components/back-to-top"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Hero } from "@/sections/hero"
import { About } from "@/sections/about"
import { Skills } from "@/sections/skills"
import { Certifications } from "@/sections/certifications"
import { Courses } from "@/sections/courses"
import { Experience } from "@/sections/experience"
import { Projects } from "@/sections/projects"
import { Contact } from "@/sections/contact"

export default function App() {
  useKeyboardShortcuts()

  return (
    <TooltipProvider delayDuration={200}>
      <Analytics />
      <Navbar />
      <main>
        <Hero />
        <Separator />
        <About />
        <Separator />
        <Skills />
        <Separator />
        <Certifications />
        <Courses />
        <Separator />
        <Experience />
        <Separator />
        <Projects />
        <Separator />
        <Contact />
      </main>
      <BackToTop />
      <Toaster richColors position="bottom-right" />
    </TooltipProvider>
  )
}
