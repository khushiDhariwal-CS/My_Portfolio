export interface SiteLinks {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  leetcode: string;
  resume: string;
  crowdCivicLive: string;
  crowdCivicGithub: string;
  project2Live: string;
  project2Github: string;
  project3Live: string;
  project3Github: string;
  collegepur: string;
  cetpa: string;
  college: string;
  certificates: string;
}

export const links: SiteLinks = {
  email: "mailto:kdhariwal44@gmail.com",
  phone: "tel:+917668592309",
  linkedin: "https://www.linkedin.com/in/khushi-dhariwal-13b75a27b/?isSelfProfile=false",
  github: "https://github.com/khushiDhariwal-CS",
  leetcode: "https://leetcode.com/u/khushi_dhariwal",
  resume: "/Khushi_Dhariwal_Resume_ATS.pdf",
  crowdCivicLive: "https://crowdcivic-ai.vercel.app/",
  crowdCivicGithub: "https://github.com/khushiDhariwal-CS",
  project2Live: "",
  project2Github: "",
  project3Live: "",
  project3Github: "",
  collegepur: "",
  cetpa: "",
  college: "",
  certificates: "",
};

/**
 * Checks if a given link URL is valid and ready to be displayed.
 * Returns false if the URL is empty or contains a placeholder token.
 */
export function isLiveLink(url?: string | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") return false;
  if (trimmed.toUpperCase().includes("[PLACEHOLDER") || trimmed.toUpperCase().includes("[CONFIRM")) {
    return false;
  }
  return true;
}

export default links;
