import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Analytics } from "@vercel/analytics/react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Home } from "@/pages/Home"
import { Work } from "@/pages/Work"
import { ProjectDetail } from "@/pages/ProjectDetail"
import { About } from "@/pages/About"
import { Contact } from "@/pages/Contact"

export default function App() {
  return (
    <BrowserRouter>
      <TooltipProvider delayDuration={200}>
        <Analytics />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </TooltipProvider>
    </BrowserRouter>
  )
}
