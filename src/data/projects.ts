import { links } from "./links";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ArchitectureLayer {
  layer: string;
  tech: string;
  responsibility: string;
}

export interface TechStackGroup {
  group: string;
  items: string[];
}

export interface ChallengeItem {
  challenge: string;
  approach: string;
  outcome: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  status: "Live" | "In progress" | "Prototype";
  year: string;
  role: string;
  duration: string;
  teamSize: string;
  overview: string;
  problem: string;
  solution: string;
  audience: string;
  features: ProjectFeature[];
  userFlow: string[];
  architecture: ArchitectureLayer[];
  techStack: TechStackGroup[];
  challenges: ChallengeItem[];
  learnings: string[];
  futureImprovements: string[];
  links: {
    live?: string;
    github?: string;
    demoVideo?: string;
  };
  images: ProjectImage[];
  coverImage: string;
}

export const projects: Project[] = [
  {
    slug: "crowd-civic-ai",
    title: "Crowd Civic AI",
    tagline:
      "A civic complaint portal where citizens report potholes and broken streetlights online, with AI-assisted verification and a public dashboard that shows what is being fixed.",
    status: "Live",
    year: "2026",
    role: "Full Stack Developer (Solo Project)",
    duration: "2 Months",
    teamSize: "1 Developer",
    overview:
      "Crowd Civic AI is an AI-powered civic complaint and resolution portal built to eliminate bureaucratic hurdles in municipal reporting. Powered by Next.js App Router, Firebase, Google Maps API, and the Gemini API, it lets citizens submit geotagged photo reports and track live resolution progress directly through an open civic dashboard.",
    problem:
      "Citizens previously had to visit government or municipal offices in person to report issues like potholes and broken streetlights. There was no easy way to submit evidence, no visibility into complaint status, and no public view of which issues were still open.",
    solution:
      "A web portal where a citizen logs in, submits a complaint with photo uploads and a tagged location, and tracks its status. AI assists in verifying complaints, and a public dashboard shows open issues by area with real-time status updates.",
    audience:
      "Residents looking for faster civic issue resolution, and municipal administration teams managing infrastructure repairs.",
    features: [
      {
        title: "Secure Authentication & Roles",
        description:
          "Firebase Authentication with Google OAuth and email login, supporting role-based access for citizens and municipal authority officers.",
      },
      {
        title: "Live Camera & Photo Uploads",
        description:
          "Incident evidence capture using live camera snaps or direct image uploads, securely stored and served via Firebase Storage.",
      },
      {
        title: "Automatic Geolocation Tagging",
        description:
          "Google Maps API integration for automatic GPS coordinate capture and interactive pin placement with reverse-geocoded local addresses.",
      },
      {
        title: "Gemini AI Verification & Triage",
        description:
          "Gemini API inspects complaint imagery to classify severity (Medium, High, Critical), identify hazard types, and categorize departments.",
      },
      {
        title: "Public Community Incident Feed",
        description:
          "Ward-by-ward public dashboard allowing community members to view open reports, monitor progress, and upvote unresolved issues.",
      },
      {
        title: "Municipal Authority Portal",
        description:
          "Dedicated administrative command center with real-time KPIs, mandatory proof verification, and audit logs before tickets are marked resolved.",
      },
    ],
    userFlow: [
      "Citizen signs up or signs in using email or Google Account.",
      "Citizen reports an issue: selects category, uploads photo evidence or captures with live camera, and confirms tagged GPS coordinates.",
      "The complaint undergoes AI-assisted verification via the Gemini API to assess validity and assign priority.",
      "The verified complaint appears on the public dashboard with real-time status visible by area.",
      "Municipal authority team inspects the issue, dispatches resolution crews, and uploads proof.",
      "The citizen tracks the ticket through each stage until the issue is confirmed resolved.",
    ],
    architecture: [
      {
        layer: "Frontend & Routing",
        tech: "Next.js (App Router, SSR), React.js, Tailwind CSS",
        responsibility: "Responsive user interface, server-side rendering, and camera/map integrations",
      },
      {
        layer: "Authentication",
        tech: "Firebase Auth & Google OAuth",
        responsibility: "Citizen registration, session management, and role-guarded routes",
      },
      {
        layer: "Storage",
        tech: "Firebase Storage",
        responsibility: "Secure incident evidence uploads and high-availability image delivery",
      },
      {
        layer: "Database",
        tech: "Firebase Firestore",
        responsibility: "Real-time complaint tracking, GPS coordinates, status transitions, and audit records",
      },
      {
        layer: "Maps & Geolocation",
        tech: "Google Maps API",
        responsibility: "Automatic geolocation coordinates and area-based map visualizations",
      },
      {
        layer: "AI Verification",
        tech: "Gemini API",
        responsibility: "Complaint category confirmation, visual validation, and priority ranking",
      },
      {
        layer: "Deployment",
        tech: "Vercel",
        responsibility: "Global edge hosting with continuous deployment and low-latency asset serving",
      },
    ],
    techStack: [
      {
        group: "Frontend",
        items: ["React.js", "Next.js", "JavaScript (ES6+)", "Tailwind CSS"],
      },
      {
        group: "Backend & Data",
        items: ["Firebase Auth", "Firebase Storage", "Firebase Firestore", "REST API"],
      },
      {
        group: "Cloud & APIs",
        items: ["Gemini API", "Google Maps API", "Vercel"],
      },
      {
        group: "Engineering & QA",
        items: ["Git", "GitHub", "SDLC", "Manual & Integration Testing"],
      },
    ],
    challenges: [
      {
        challenge: "Uploading high-resolution mobile camera photos reliably across varying cellular networks.",
        approach:
          "Implemented client-side image compression and chunked uploads to Firebase Storage with optimistic UI feedback.",
        outcome:
          "Reduced upload latency significantly while maintaining clarity for municipal verification.",
      },
      {
        challenge: "Ensuring exact GPS coordinates when mobile GPS accuracy fluctuates.",
        approach:
          "Integrated Google Maps API with interactive pin placement and reverse-geocoding fallback.",
        outcome:
          "Enabled citizens to confirm the exact street location within seconds.",
      },
      {
        challenge: "Structuring Gemini API prompts for reliable defect classification without false flags.",
        approach:
          "Formulated strict JSON schema constraints and error fallback states for AI verification.",
        outcome:
          "Consistent issue classification and priority triage across all report categories.",
      },
    ],
    learnings: [
      "Deepened expertise in Next.js App Router for combining server-rendered SEO pages with dynamic client camera and map components.",
      "Gained hands-on experience integrating Firebase Authentication, Storage, Google Maps, and the Gemini API in a production application.",
      "Learned the importance of user-centric design in public-interest civic tools where accessibility is paramount.",
    ],
    futureImprovements: [
      "SMS & WhatsApp notifications when a citizen's complaint advances to resolved.",
      "Geospatial duplicate-clustering to automatically group identical issues reported by multiple neighbors.",
      "Progressive Web App (PWA) with offline draft mode for areas with poor connectivity.",
    ],
    links: {
      live: links.crowdCivicLive,
      github: links.crowdCivicGithub,
    },
    images: [
      {
        src: "/projects/crowd-civic-ai/citizen-portal.png",
        alt: "Crowd Civic AI Citizen Portal interface",
        caption: "Citizen Portal: Overview providing quick access to report issues, track personal submissions, and view public feeds.",
      },
      {
        src: "/projects/crowd-civic-ai/file-report.png",
        alt: "File a Civic Incident Report with live camera and GPS tagging",
        caption: "Incident Reporting Wizard: Direct camera capture, automatic GPS tagging (Ghaziabad, UP), and issue categorization.",
      },
      {
        src: "/projects/crowd-civic-ai/incident-feed.png",
        alt: "Community Incident Feed with verified civic cards and citizen support counts",
        caption: "Community Incident Feed: Public feed of verified complaints (Fire, Waste, Roads) with citizen support counters.",
      },
      {
        src: "/projects/crowd-civic-ai/authority-portal.png",
        alt: "Municipal Authority Portal Incidents & Resolution Command",
        caption: "Municipal Authority Command: Dashboard showing 10 total reports, review queues, and AI resolution audits.",
      },
      {
        src: "/projects/crowd-civic-ai/auth-signin.png",
        alt: "CrowdCivic AI sign-in screen with sample credentials and Google OAuth",
        caption: "Authentication System: Role-based sign-in with sample credentials for rapid review and Google OAuth integration.",
      },
    ],
    coverImage: "/projects/crowd-civic-ai/citizen-portal.png",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}

export default projects;
