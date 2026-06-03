import { Navbar } from "@/components/navbar"
import { BackToTop } from "@/components/back-to-top"
import { Hero } from "@/sections/hero"
import { About } from "@/sections/about"
import { Skills } from "@/sections/skills"
import { Certifications } from "@/sections/certifications"
import { Courses } from "@/sections/courses"
import { Experience } from "@/sections/experience"
import { Projects } from "@/sections/projects"
import { GitHubActivity } from "@/sections/github-activity"
import { Contact } from "@/sections/contact"

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Courses />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}
