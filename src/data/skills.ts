export interface Skill {
  name: string
  category: "frontend" | "backend" | "tools" | "platforms" | "ai"
}

export const skills: Skill[] = [
  { name: "React", category: "frontend" },
  { name: "Node.js", category: "frontend" },
  { name: "Express", category: "frontend" },
  { name: "Django", category: "frontend" },
  { name: "Flask", category: "frontend" },
  { name: "HTML/CSS/JS", category: "frontend" },

  { name: "Python", category: "backend" },
  { name: "C", category: "backend" },
  { name: "SQLite", category: "backend" },
  { name: "MongoDB", category: "backend" },

  { name: "Linux", category: "platforms" },
  { name: "Windows Server", category: "platforms" },
  { name: "Active Directory", category: "platforms" },
  { name: "AWS", category: "platforms" },
  { name: "Windows 10/11", category: "platforms" },
  { name: "macOS", category: "platforms" },

  { name: "PowerShell", category: "tools" },
  { name: "Zendesk", category: "tools" },
  { name: "FreshService", category: "tools" },
  { name: "Exchange Admin", category: "tools" },
  { name: "Five9/CXone", category: "tools" },
  { name: "CyberSecurity", category: "tools" },
  { name: "GitHub", category: "tools" },

  { name: "ChatGPT/Gemini", category: "ai" },
  { name: "Opencode Agents", category: "ai" },
]

export const categoryLabels: Record<string, string> = {
  frontend: "Frontend & Backend",
  backend: "Languages & Databases",
  platforms: "Platforms & Infrastructure",
  tools: "Tools & Security",
  ai: "AI & Automation",
}
