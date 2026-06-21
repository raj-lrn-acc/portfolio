export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  year: string
  color: string
  description: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "IAM Portal",
    subtitle: "Enterprise Identity & Access Management",
    category: "Security",
    year: "2025",
    color: "#2d5a3d",
    description: "Built a comprehensive IAM portal with role-based access control, SSO integration, and automated user provisioning for a multi-national enterprise client.",
  },
  {
    id: "2",
    title: "DevOps Pipeline",
    subtitle: "CI/CD Infrastructure",
    category: "Infrastructure",
    year: "2025",
    color: "#4a3d6b",
    description: "Designed and implemented a complete CI/CD pipeline using GitHub Actions, Docker, and automated testing with zero-downtime deployment.",
  },
  {
    id: "3",
    title: "LLM Code Roast",
    subtitle: "AI-Powered Code Review",
    category: "AI",
    year: "2024",
    color: "#6b3d3d",
    description: "An LLM-based code review tool that analyzes pull requests and provides humorous yet constructive feedback on code quality and style.",
  },
  {
    id: "4",
    title: "Cloud Migration",
    subtitle: "AWS Infrastructure Overhaul",
    category: "Cloud",
    year: "2024",
    color: "#3d5a6b",
    description: "Led a complete migration from on-premise infrastructure to AWS, including VPC design, security groups, and cost optimization strategies.",
  },
  {
    id: "5",
    title: "Monorepo Toolkit",
    subtitle: "Scalable Package Management",
    category: "Tooling",
    year: "2024",
    color: "#5a4d3d",
    description: "Developed a monorepo management toolkit with automated dependency resolution, build caching, and cross-package testing utilities.",
  },
  {
    id: "6",
    title: "API Gateway",
    subtitle: "Microservices Architecture",
    category: "Backend",
    year: "2023",
    color: "#3d5a4d",
    description: "Architected an API gateway handling 10k+ requests per minute with rate limiting, authentication, and smart request routing.",
  },
]
