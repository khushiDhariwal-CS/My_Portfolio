import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Users,
  Clock,
  Briefcase,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { projects, getProjectBySlug, getNextProject } from "@/data/projects";
import { isLiveLink } from "@/data/links";
import { Container, Section } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { ScreenshotSwipeGallery } from "@/components/ScreenshotSwipeGallery";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — Khushi Dhariwal",
    };
  }

  return {
    title: `${project.title} — Case Study by Khushi Dhariwal`,
    description: project.overview,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.overview,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);
  const hasLiveLink = isLiveLink(project.links.live);
  const hasGithubLink = isLiveLink(project.links.github);

  return (
    <div className="flex flex-col w-full pt-32 sm:pt-36 pb-24">
      {/* Top back breadcrumb */}
      <Container>
        <div className="mb-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6E675D] hover:text-[#2B2823] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to selected work</span>
          </Link>
        </div>

        {/* 1. HERO */}
        <div className="flex flex-col gap-6 mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={project.status === "Live" ? "live" : "neutral"}>
              {project.status}
            </Badge>
            <span className="text-xs uppercase tracking-widest text-[#6E675D]">
              {project.year}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E7DFD2]" />
            <span className="text-xs text-[#6E675D]">{project.role}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#2B2823] leading-[1.12]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#6E675D] max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            {hasLiveLink && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#2B2823] text-[#FAF7F2] hover:bg-[#3E3A33] transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                aria-label={`Open ${project.title} live deployment in a new tab`}
              >
                <span>Open Live Deployment</span>
                <ExternalLink className="w-4 h-4 text-[#B89B7A]" />
              </a>
            )}

            {hasGithubLink && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-[#F1EBE1] text-[#2B2823] hover:bg-[#E7DFD2] border border-[#E7DFD2] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <GithubIcon className="w-4 h-4 text-[#6E675D]" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* 2. OVERVIEW & QUICK FACTS IN SOFT SAND CARD */}
        <div className="bg-[#F1EBE1] rounded-[28px] p-8 sm:p-10 border border-[#E7DFD2] shadow-warm-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B89B7A] block mb-3">
                Project Overview
              </span>
              <p className="text-base sm:text-lg text-[#2B2823] leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-[18px] border border-[#E7DFD2]/60">
                <span className="text-[11px] uppercase tracking-wider text-[#6E675D] block mb-1">
                  Role
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#2B2823]">
                  {project.role}
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-[18px] border border-[#E7DFD2]/60">
                <span className="text-[11px] uppercase tracking-wider text-[#6E675D] block mb-1">
                  Duration
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#2B2823]">
                  {project.duration}
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-[18px] border border-[#E7DFD2]/60">
                <span className="text-[11px] uppercase tracking-wider text-[#6E675D] block mb-1">
                  Team
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#2B2823]">
                  {project.teamSize}
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-[18px] border border-[#E7DFD2]/60">
                <span className="text-[11px] uppercase tracking-wider text-[#6E675D] block mb-1">
                  Status
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#2B2823]">
                  {project.status} (Production)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 & 4. PROBLEM & SOLUTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-20">
          {/* Problem */}
          <div className="bg-white rounded-[24px] p-8 border border-[#E7DFD2] shadow-warm-sm flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B89B7A]">
              01. The Problem
            </span>
            <h3 className="text-2xl font-light tracking-tight text-[#2B2823]">
              Inefficient, manual civic reporting.
            </h3>
            <p className="text-sm sm:text-base text-[#6E675D] leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="bg-white rounded-[24px] p-8 border border-[#E7DFD2] shadow-warm-sm flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B89B7A]">
              02. The Solution
            </span>
            <h3 className="text-2xl font-light tracking-tight text-[#2B2823]">
              AI-assisted, geotagged resolution portal.
            </h3>
            <p className="text-sm sm:text-base text-[#6E675D] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* 5. KEY FEATURES */}
        <div className="mb-20">
          <div className="flex flex-col gap-3 mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
              03. Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#2B2823]">
              Key technical features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E7DFD2] shadow-warm-sm flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E7DFD2] flex items-center justify-center text-xs font-semibold text-[#B89B7A]">
                    {idx + 1}
                  </span>
                  <h4 className="text-base font-medium text-[#2B2823]">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-sm text-[#6E675D] leading-relaxed pl-8">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. USER FLOW (NUMBERED, MINIMAL) */}
        <div className="bg-[#FAF7F2] rounded-[28px] p-8 sm:p-12 border border-[#E7DFD2] shadow-warm-sm mb-20">
          <div className="flex flex-col gap-3 mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
              04. Citizen &amp; Municipal Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#2B2823]">
              Step-by-step user journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.userFlow.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[20px] p-6 border border-[#E7DFD2] flex flex-col gap-3 shadow-warm-sm"
              >
                <span className="text-xs font-mono font-medium text-[#B89B7A]">
                  Step {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-[#2B2823] leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. ARCHITECTURE & TECH STACK */}
        <div className="mb-20">
          <div className="flex flex-col gap-3 mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
              05. System Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#2B2823]">
              System architecture &amp; tech layers
            </h2>
          </div>

          {/* Architecture Table */}
          <div className="bg-white rounded-[24px] border border-[#E7DFD2] shadow-warm-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1EBE1]/70 border-b border-[#E7DFD2] text-xs font-semibold uppercase tracking-wider text-[#6E675D]">
                    <th className="py-4 px-6">Layer</th>
                    <th className="py-4 px-6">Technology</th>
                    <th className="py-4 px-6">System Responsibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD2] text-sm">
                  {project.architecture.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-[#2B2823] whitespace-nowrap">
                        {row.layer}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-[#B89B7A] whitespace-nowrap">
                        {row.tech}
                      </td>
                      <td className="py-4 px-6 text-[#6E675D] leading-relaxed">
                        {row.responsibility}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tech Stack Group Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.techStack.map((group, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-[18px] p-5 border border-[#E7DFD2]"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B89B7A] block mb-3">
                  {group.group}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-xs bg-white text-[#2B2823] border border-[#E7DFD2]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. SCREENSHOT GALLERY: INTERACTIVE SWIPE MODE VIEW */}
        <div className="mb-20">
          <div className="flex flex-col gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
              06. Visual Walkthrough
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#2B2823]">
                Production interface gallery
              </h2>
              <span className="text-xs text-[#6E675D]">
                Swipe or click arrows to explore · Click to enlarge
              </span>
            </div>
          </div>

          {/* Smooth Swipe Gallery */}
          <ScreenshotSwipeGallery
            images={project.images}
            projectTitle={project.title}
          />
        </div>

        {/* 9. CHALLENGES & LEARNINGS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Challenges */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
                07. Engineering Deep-Dive
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2B2823]">
                Challenges overcome
              </h3>
            </div>

            <div className="space-y-5">
              {project.challenges.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[22px] p-6 border border-[#E7DFD2] shadow-warm-sm flex flex-col gap-2.5"
                >
                  <h4 className="text-sm font-semibold text-[#2B2823]">
                    {c.challenge}
                  </h4>
                  <div className="text-xs sm:text-sm text-[#6E675D] leading-relaxed space-y-1">
                    <p>
                      <strong className="text-[#2B2823] font-medium">Approach:</strong>{" "}
                      {c.approach}
                    </p>
                    <p>
                      <strong className="text-[#2B2823] font-medium">Outcome:</strong>{" "}
                      {c.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learnings */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
                Key Insights
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2B2823]">
                What I learned
              </h3>
            </div>

            <div className="bg-[#F1EBE1] rounded-[24px] p-7 border border-[#E7DFD2] shadow-warm-sm flex flex-col gap-4">
              <ul className="space-y-4">
                {project.learnings.map((learning, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#2B2823] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#B89B7A] mt-1 flex-shrink-0" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 10. WHAT I WOULD IMPROVE NEXT */}
        <div className="bg-white rounded-[24px] p-8 sm:p-10 border border-[#E7DFD2] shadow-warm-sm mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D] block mb-3">
            08. Product Roadmap
          </span>
          <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2B2823] mb-6">
            Future improvements &amp; iterations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.futureImprovements.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] p-5 rounded-[18px] border border-[#E7DFD2]"
              >
                <span className="text-xs font-mono text-[#B89B7A] block mb-2">
                  0{idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#2B2823] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 11. BOTTOM LINKS & NEXT PROJECT NAVIGATION */}
        <div className="pt-12 border-t border-[#E7DFD2] flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6E675D] hover:text-[#2B2823] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          {hasLiveLink && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#2B2823] text-[#FAF7F2] hover:bg-[#3E3A33] transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
            >
              <span>Visit crowdcivic-ai.vercel.app</span>
              <ExternalLink className="w-4 h-4 text-[#B89B7A]" />
            </a>
          )}
        </div>
      </Container>
    </div>
  );
}
