export interface Skill {
  name: string
  category: "frontend" | "backend" | "tools" | "platforms" | "ai"
  level: number
}

export const skills: Skill[] = [
  { name: "React", category: "frontend", level: 3 },
  { name: "Node.js", category: "frontend", level: 3 },
  { name: "Express", category: "frontend", level: 3 },
  { name: "Django", category: "frontend", level: 2 },
  { name: "Flask", category: "frontend", level: 2 },
  { name: "HTML/CSS/JS", category: "frontend", level: 4 },

  { name: "Python", category: "backend", level: 4 },
  { name: "C", category: "backend", level: 2 },
  { name: "SQLite", category: "backend", level: 3 },
  { name: "MongoDB", category: "backend", level: 3 },

  { name: "Linux", category: "platforms", level: 4 },
  { name: "Windows Server", category: "platforms", level: 4 },
  { name: "Active Directory", category: "platforms", level: 4 },
  { name: "AWS", category: "platforms", level: 2 },
  { name: "Windows 10/11", category: "platforms", level: 4 },
  { name: "macOS", category: "platforms", level: 3 },

  { name: "PowerShell", category: "tools", level: 4 },
  { name: "Zendesk", category: "tools", level: 4 },
  { name: "FreshService", category: "tools", level: 3 },
  { name: "Exchange Admin", category: "tools", level: 4 },
  { name: "Five9/CXone", category: "tools", level: 3 },
  { name: "CyberSecurity", category: "tools", level: 2 },
  { name: "GitHub", category: "tools", level: 3 },

  { name: "ChatGPT/Gemini", category: "ai", level: 3 },
  { name: "Opencode Agents", category: "ai", level: 2 },
]

export const categoryLabels: Record<string, string> = {
  frontend: "Frontend & Backend",
  backend: "Languages & Databases",
  platforms: "Platforms & Infrastructure",
  tools: "Tools & Security",
  ai: "AI & Automation",
}
