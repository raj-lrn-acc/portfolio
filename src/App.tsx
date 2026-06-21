import { useState, lazy, Suspense } from "react"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Analytics } from "@vercel/analytics/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Cursor } from "@/components/cursor"
import { SplashScreen } from "@/components/splash-screen"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Hero } from "@/sections/hero"

const About = lazy(() => import("@/sections/about").then((m) => ({ default: m.About })))
const Projects = lazy(() => import("@/sections/projects").then((m) => ({ default: m.Projects })))
const Contact = lazy(() => import("@/sections/contact").then((m) => ({ default: m.Contact })))

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />
  }

  return <MainApp />
}

function MainApp() {
  useKeyboardShortcuts()

  return (
    <TooltipProvider delayDuration={200}>
      <Analytics />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Lazy><About /></Lazy>
        <Lazy><Projects /></Lazy>
        <Lazy><Contact /></Lazy>
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </TooltipProvider>
  )
}
