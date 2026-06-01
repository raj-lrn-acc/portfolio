export interface Experience {
  title: string
  company: string
  period: string
  description: string
}

export const experiences: Experience[] = [
  {
    title: "Customer Experience Agent - End-User Support",
    company: "IntouchCX – Winnipeg, MB",
    period: "Oct 2025 - Present",
    description:
      "Manage user access across enterprise systems — troubleshoot login issues, MFA challenges, authentication errors, and account lockouts. Process IAM requests through Zendesk following security and compliance protocols. Maintain detailed audit trails and knowledge base articles. Handle sensitive financial data under strict regulatory controls.",
  },
  {
    title: "IT Support Specialist (Intern)",
    company: "Bison Transport – Winnipeg, MB",
    period: "May 2024 - May 2025",
    description:
      "Managed user identity lifecycle in Active Directory — provisioning, security groups, GPOs, password resets, account unlocks. Administered Exchange environment including shared mailboxes, distribution groups, and mail-enabled security groups. Managed PIM workflows and MFA resets. Created SOPs contributing to a 5-10% reduction in repeat incidents.",
  },
]
