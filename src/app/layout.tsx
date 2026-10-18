import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { links } from "@/data/links";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://khushidhariwal.dev"),
  title: "Khushi Dhariwal — Full Stack Developer (MERN, Next.js)",
  description:
    "Portfolio of Khushi Dhariwal, a Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, and Firebase. Open to SDE and Full Stack roles.",
  keywords: [
    "Khushi Dhariwal",
    "Full Stack Developer",
    "Software Development Engineer",
    "Next.js Developer",
    "MERN Stack",
    "React Developer",
    "Node.js",
    "Crowd Civic AI",
    "Web Developer Ghaziabad",
    "Delhi NCR SDE",
  ],
  authors: [{ name: "Khushi Dhariwal", url: "https://github.com/khushiDhariwal-CS" }],
  creator: "Khushi Dhariwal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khushidhariwal.dev",
    siteName: "Khushi Dhariwal Portfolio",
    title: "Khushi Dhariwal — Full Stack Developer (MERN, Next.js)",
    description:
      "I build thoughtful web products, from interface to database. Specializing in React.js, Next.js, and Node.js.",
    images: [
      {
        url: "/khushi.jpg",
        width: 800,
        height: 1000,
        alt: "Khushi Dhariwal — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khushi Dhariwal — Full Stack Developer",
    description:
      "Engineering resilient web architectures with React, Next.js, and Node.js.",
    images: ["/khushi.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Khushi Dhariwal",
    jobTitle: "Full Stack Developer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "IMS Engineering College, Ghaziabad",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "India",
    },
    email: "mailto:kdhariwal44@gmail.com",
    telephone: "+917668592309",
    sameAs: [
      links.github,
      links.linkedin,
      links.leetcode,
    ],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2B2823] antialiased selection:bg-[#F1EBE1] selection:text-[#2B2823]">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#2B2823] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content" className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
