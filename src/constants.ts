/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const RESUME_DATA = {
  name: "Megha Agarwal",
  role: "Software Engineer (L4)",
  team: "Backup and Disaster Recovery @ Google",
  location: "Hyderabad, India",
  email: "meghaha@google.com",
  summary: "Systems-oriented Software Engineer with a focus on Generative AI integration and high-scale cloud architecture. Expert at optimizing distributed systems at Google scale, achieving 89% database performance gains and O(1) algorithmic scalability.",
  
  experience: [
    {
      company: "Google",
      role: "Software Engineer (L4), GCBDR",
      period: "July 2022 – Present",
      highlights: [
        "Won 1st Place in GCBDR Hackathon with 'Backie' (GenAI agent).",
        "Improved core database reporting performance by 89%.",
        "Architected dynamic, tag-based protection for 20,000 VMs in ~1 second.",
        "Reduced customer escalations by 45% YoY via unified monitoring framework."
      ]
    },
    {
      company: "Google",
      role: "Software Engineering Intern",
      period: "May 2021 – July 2021",
      highlights: [
        "Optimized query performance by up to 77% using full-text search indexing on Cloud Spanner.",
        "Engineered scalable database interface for 2M+ records."
      ]
    }
  ],

  skills: {
    genAI: ["Gemini 1.5 Pro/Flash", "Vertex AI", "Agentic Workflows", "RAG", "Vector Databases", "Semantic Search"],
    languages: ["Java", "Go", "TypeScript", "Rust", "GraphQL"],
    cloud: ["GCP", "Spanner", "BigQuery", "Cloud Filestore", "Distributed Systems"],
    tools: ["Monitoring/Streamz", "Plx", "Mendel", "Pod-Batch", "LRO"]
  },

  projects: [
    {
      title: "FinVue AI",
      tech: "React 19, Gemini 3 Flash, Recharts",
      description: "Intelligent Finance Command Center performing forensic portfolio audits and behavioral financial advising."
    }
  ],

  awards: [
    "11 Spot Bonuses & 16 Peer Bonuses",
    "1st Place GCBDR Hackathon",
    "Dean’s List (Top 10%) @ Shiv Nadar University"
  ]
};
