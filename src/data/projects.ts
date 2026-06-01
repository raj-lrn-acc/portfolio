export interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    title: "Unit Converter",
    description:
      "A full-stack web app built with React and Express for converting between different units of measurement. Deployed and live on Render.",
    tags: ["React", "Express", "Node.js", "CSS"],
    image: "",
    liveUrl: "https://unit-converter-arra.onrender.com",
    repoUrl: "https://github.com/Xqni/Unit-Converter",
  },
  {
    title: "Blogging Platform API",
    description:
      "RESTful API for a blogging platform built with Node.js and Express. Supports full CRUD operations for blog posts with a clean controller-based architecture.",
    tags: ["Node.js", "Express", "REST API", "JavaScript"],
    image: "",
    repoUrl: "https://github.com/Xqni/Blogging-Platform-API",
  },
  {
    title: "Expense Tracker",
    description:
      "A CLI program in Python to track personal expenses. Features add, update, delete, and summary commands with persistent storage.",
    tags: ["Python", "CLI", "argparse", "JSON"],
    image: "",
    repoUrl: "https://github.com/Xqni/Expense-Tracker",
  },
  {
    title: "GitHub User Activity",
    description:
      "A command-line tool that fetches and displays GitHub user activity. Demonstrates API integration and clean CLI design in Python.",
    tags: ["Python", "CLI", "GitHub API", "JSON"],
    image: "",
    repoUrl: "https://github.com/Xqni/GitHub-User-Activity",
  },
]
