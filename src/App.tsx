import { lazy, Suspense } from "react"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Analytics } from "@vercel/analytics/react"
import { Navbar } from "@/components/navbar"
import { BackToTop } from "@/components/back-to-top"
import { Footer } from "@/components/footer"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Hero } from "@/sections/hero"

const About = lazy(() => import("@/sections/about").then((m) => ({ default: m.About })))
const Skills = lazy(() => import("@/sections/skills").then((m) => ({ default: m.Skills })))
const Certifications = lazy(() => import("@/sections/certifications").then((m) => ({ default: m.Certifications })))
const Courses = lazy(() => import("@/sections/courses").then((m) => ({ default: m.Courses })))
const Experience = lazy(() => import("@/sections/experience").then((m) => ({ default: m.Experience })))
const Projects = lazy(() => import("@/sections/projects").then((m) => ({ default: m.Projects })))
const Contact = lazy(() => import("@/sections/contact").then((m) => ({ default: m.Contact })))
const Services = lazy(() => import("@/sections/services").then((m) => ({ default: m.Services })))

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>
}

export default function App() {
  useKeyboardShortcuts()

  return (
    <TooltipProvider delayDuration={200}>
      <Analytics />
      <Navbar />
      <main>
        <Hero />
        <Lazy><About /></Lazy>
        <Lazy><Services /></Lazy>
        <Lazy><Skills /></Lazy>
        <Lazy><Certifications /></Lazy>
        <Lazy><Courses /></Lazy>
        <Lazy><Experience /></Lazy>
        <Lazy><Projects /></Lazy>
        <Lazy><Contact /></Lazy>
      </main>
      <BackToTop />
      <Footer />
      <Toaster richColors position="bottom-right" />
    </TooltipProvider>
  )
}
