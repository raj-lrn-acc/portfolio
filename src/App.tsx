import { Suspense, lazy, useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "@/components/Header"
import { Cursor } from "@/components/Cursor"
import { Loader } from "@/components/Loader"

const Home = lazy(() => import("@/pages/Home"))
const Projects = lazy(() => import("@/pages/Projects"))
const Contact = lazy(() => import("@/pages/Contact"))

export default function App() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      {showLoader && <Loader onEnter={() => setShowLoader(false)} />}
      <div className={`${showLoader ? "hidden" : "block"} min-h-screen`}>
        <BrowserRouter>
          <Cursor />
          <Header />
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="loader-box">
                  {["L", "O", "A", "D", "I", "N"].map((l, i) => (
                    <div key={i} className="loader-box-face font-serif font-light text-muted-foreground" style={{ color: "#424242" }}>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </>
  )
}
