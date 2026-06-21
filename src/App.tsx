import { lazy, Suspense } from "react"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Analytics } from "@vercel/analytics/react"
import { Navbar } from "@/components/navbar"
import { NavDots } from "@/components/nav-dots"
import { Footer } from "@/components/footer"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Hero } from "@/sections/hero"

const Specs = lazy(() => import("@/sections/specs").then((m) => ({ default: m.Specs })))
const Features = lazy(() => import("@/sections/features").then((m) => ({ default: m.Features })))
const Stack = lazy(() => import("@/sections/stack").then((m) => ({ default: m.Stack })))
const Testimonials = lazy(() => import("@/sections/testimonials").then((m) => ({ default: m.Testimonials })))
const Projects = lazy(() => import("@/sections/projects").then((m) => ({ default: m.Projects })))
const Changelog = lazy(() => import("@/sections/changelog").then((m) => ({ default: m.Changelog })))
const Contact = lazy(() => import("@/sections/contact").then((m) => ({ default: m.Contact })))

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>
}

export default function App() {
  useKeyboardShortcuts()

  return (
    <TooltipProvider delayDuration={200}>
      <Analytics />
      <Navbar />
      <NavDots />
      <main>
        <Hero />
        <Lazy><Specs /></Lazy>
        <Lazy><Features /></Lazy>
        <Lazy><Stack /></Lazy>
        <Lazy><Testimonials /></Lazy>
        <Lazy><Projects /></Lazy>
        <Lazy><Changelog /></Lazy>
        <Lazy><Contact /></Lazy>
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </TooltipProvider>
  )
}
