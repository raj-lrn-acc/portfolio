export interface Certification {
  name: string
  issuer: string
  status: "completed" | "in-progress" | "planned"
  description?: string
  url?: string
}

export const certifications: Certification[] = [
  {
    name: "AWS Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services",
    status: "in-progress",
    description: "Currently studying — foundational cloud concepts, AWS services, pricing, and architecture best practices.",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
  {
    name: "CompTIA A+",
    issuer: "CompTIA",
    status: "planned",
    description: "Planned after AWS — hardware, networking, mobile devices, operating systems, and troubleshooting.",
    url: "https://www.comptia.org/certifications/a",
  },
]
