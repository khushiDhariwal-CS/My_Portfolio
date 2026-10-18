export interface EducationItem {
  degree: string;
  institution: string;
  boardOrAffiliation: string;
  year: string;
  score: string;
  linkKey?: "college";
}

export interface ExperienceItem {
  role: string;
  company: string;
  type: string;
  period: string;
  isCurrent?: boolean;
  bullets: string[];
  linkKey?: "collegepur" | "cetpa";
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
  linkKey?: "certificates";
}

export interface CodingProfile {
  name: string;
  platform: string;
  username: string;
  profileUrl: string;
  badge?: string;
  description: string;
  solvedCountPlaceholder?: string;
}

export const siteConfig = {
  name: "Khushi Dhariwal",
  initials: "KD",
  headline: "Full Stack Developer (MERN, Next.js)",
  heroTitle: "I build thoughtful web products, from interface to database.",
  heroSubtitle:
    "Engineering resilient full-stack systems with React, Next.js, and Node.js. Focused on performance, quiet aesthetics, and reliable architecture.",
  availability: "Open to SDE and Full Stack roles",
  locations: "Ghaziabad, Uttar Pradesh, India. Open to Noida, Gurgaon, Delhi NCR, Mohali, Chandigarh and remote.",
  preferredLocations: ["Noida", "Gurgaon", "Delhi NCR", "Mohali", "Chandigarh", "Remote"],
  aboutBio:
    "B.Tech Computer Science student (2023 to 2027) at IMS Engineering College, Ghaziabad (AKTU). Overall 81.89%, 6th semester SGPA 8.23. Builds and deploys web applications with React.js, Next.js, Node.js, Express.js, MongoDB, MySQL, Firebase, and REST APIs. Strong foundation in Data Structures and Algorithms, Object-Oriented Programming, and Git/GitHub collaborative workflows.",
  aboutPersonalNote:
    "[PLACEHOLDER: Driven by building clean, high-utility web tools with meticulous attention to detail. Currently diving deeper into scalable distributed systems, Next.js server actions, and microservices design.]",
  quietFacts: [
    { label: "Academics", value: "B.Tech CSE, 2027 (81.89%)" },
    { label: "Core Stack", value: "MERN and Next.js" },
    { label: "Availability", value: "Open to NCR & Remote" },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "IMS Engineering College, Ghaziabad",
      boardOrAffiliation: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
      year: "2023 – 2027",
      score: "Overall 81.89% · 6th Sem SGPA 8.23",
      linkKey: "college",
    },
    {
      degree: "Class XII (Senior Secondary)",
      institution: "Mahamaya Balika Inter College, Noida",
      boardOrAffiliation: "CBSE",
      year: "2023",
      score: "81.20%",
    },
    {
      degree: "Class X (Secondary)",
      institution: "LFA Inter College",
      boardOrAffiliation: "UP Board",
      year: "2021",
      score: "81.33%",
    },
  ] as EducationItem[],
  experience: [
    {
      role: "Full Stack Web Developer Intern",
      company: "CollegePur",
      type: "Remote",
      period: "Sep 2026 – Present",
      isCurrent: true,
      bullets: [
        "Ships features on a live full-stack web application using React.js and Next.js on the frontend with Node.js, Express.js, and REST APIs on the backend.",
        "Works across the complete SDLC (requirements, development, testing, debugging, deployment) in an agile team using Git and GitHub workflows.",
        "Interviewed 4 intern candidates for technical and HR evaluation rounds.",
      ],
      linkKey: "collegepur",
    },
    {
      role: "MERN Stack Trainee",
      company: "Cetpa Infotech",
      type: "On-site / Hybrid",
      period: "Jun 2026",
      isCurrent: false,
      bullets: [
        "Built full-stack applications with MongoDB, Express.js, React.js, and Node.js, spanning architecture design through deployment.",
        "Developed and consumed RESTful APIs with secure data handling and applied component-based architecture in React.",
        "Collaborated in a team environment using Git version control and GitHub pull requests.",
      ],
      linkKey: "cetpa",
    },
  ] as ExperienceItem[],
  skillGroups: [
    {
      category: "Languages",
      skills: ["JavaScript (ES6+)", "Java", "SQL", "HTML5", "CSS3"],
    },
    {
      category: "Frontend",
      skills: ["React.js", "Next.js (App Router, SSR)", "Responsive Web Design", "Tailwind CSS"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "RESTful APIs", "Authentication"],
    },
    {
      category: "Databases",
      skills: ["MongoDB", "MySQL", "Firebase (Auth, Storage)"],
    },
    {
      category: "Cloud & APIs",
      skills: ["Vercel", "Google Maps API", "Gemini API", "REST"],
    },
    {
      category: "Tools & Workflow",
      skills: ["Git", "GitHub", "VS Code", "Postman"],
    },
    {
      category: "Core Computer Science",
      skills: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "Problem Solving", "SDLC"],
    },
  ] as SkillGroup[],
  certifications: [
    {
      title: "Python Full Stack Virtual Internship",
      issuer: "EduSkills",
      year: "2026",
      linkKey: "certificates",
    },
    {
      title: "AI Fundamentals",
      issuer: "IBM SkillsBuild",
      year: "2026",
      linkKey: "certificates",
    },
    {
      title: "Generative AI Studio",
      issuer: "Simplilearn",
      year: "2026",
      linkKey: "certificates",
    },
    {
      title: "Python Essentials I",
      issuer: "Cisco Networking Academy",
      linkKey: "certificates",
    },
  ] as CertificationItem[],
  codingProfiles: [
    {
      name: "GitHub",
      platform: "GitHub",
      username: "khushiDhariwal-CS",
      profileUrl: "https://github.com/khushiDhariwal-CS",
      badge: "Open Source & Projects",
      description: "Repositories, full-stack web applications, commits, and collaborative team branches.",
      solvedCountPlaceholder: "[PLACEHOLDER: e.g. 20+ Repositories]",
    },
    {
      name: "LeetCode",
      platform: "LeetCode",
      username: "khushi_dhariwal",
      profileUrl: "https://leetcode.com/u/khushi_dhariwal",
      badge: "Algorithms & DS",
      description: "Consistent problem solving in Data Structures and Algorithms with clean Java & JavaScript implementations.",
      solvedCountPlaceholder: "[PLACEHOLDER: e.g. 150+ Problems Solved]",
    },
  ] as CodingProfile[],
};

export default siteConfig;
