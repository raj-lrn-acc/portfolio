export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  color: string;
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'IAM Portal',
    tagline: 'Identity & Access Management',
    description: 'Enterprise-grade IAM solution with role-based access control, MFA enforcement, and audit trails. Built for scale with real-time policy evaluation.',
    tags: ['Security', 'Node.js', 'React', 'PostgreSQL'],
    color: '#e0e0e0',
    links: [
      { label: 'GitHub', url: '#' },
      { label: 'Live', url: '#' }
    ]
  },
  {
    id: 2,
    title: 'DevOps Pipeline',
    tagline: 'CI/CD Automation Suite',
    description: 'End-to-end pipeline orchestrator supporting multi-cloud deployments, canary releases, and automated rollback strategies with observability built in.',
    tags: ['Infrastructure', 'Kubernetes', 'Terraform', 'Go'],
    color: '#a0a0a0',
    links: [
      { label: 'GitHub', url: '#' }
    ]
  },
  {
    id: 3,
    title: 'LLM Code Roast',
    tagline: 'AI-Powered Code Review',
    description: 'An LLM-driven code review tool that roasts your code with sarcastic but constructive feedback. Supports 15+ languages and integrates with GitHub PRs.',
    tags: ['AI', 'Python', 'LLM', 'FastAPI'],
    color: '#cccccc',
    links: [
      { label: 'Live', url: '#' }
    ]
  },
  {
    id: 4,
    title: 'Cloud Migration',
    tagline: 'On-Prem to AWS Migration',
    description: 'Architected and executed a large-scale migration of 200+ services from on-premise data centers to AWS with zero-downtime cutover strategy.',
    tags: ['Cloud', 'AWS', 'Terraform', 'Docker'],
    color: '#b0b0b0',
    links: [
      { label: 'Case Study', url: '#' }
    ]
  },
  {
    id: 5,
    title: 'Monorepo Toolkit',
    tagline: 'Polyglot Build System',
    description: 'Custom monorepo management tool supporting JavaScript, Python, Go, and Rust with incremental builds, dependency graph visualization, and cache optimization.',
    tags: ['Tooling', 'Rust', 'TypeScript', 'Go'],
    color: '#d0d0d0',
    links: [
      { label: 'GitHub', url: '#' }
    ]
  },
  {
    id: 6,
    title: 'API Gateway',
    tagline: 'High-Performance Gateway',
    description: 'Lightweight, high-throughput API gateway with rate limiting, authentication, request transformation, and real-time metrics. Handles 100k+ req/s per node.',
    tags: ['Backend', 'Go', 'Redis', 'gRPC'],
    color: '#c8c8c8',
    links: [
      { label: 'GitHub', url: '#' },
      { label: 'Benchmarks', url: '#' }
    ]
  }
];
