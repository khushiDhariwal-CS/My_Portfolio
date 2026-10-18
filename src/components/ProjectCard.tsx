"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/data/projects";
import { isLiveLink } from "@/data/links";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const hasLiveLink = isLiveLink(project.links.live);
  const hasGithubLink = isLiveLink(project.links.github);

  return (
    <article className="group relative bg-white rounded-[28px] border border-[#E7DFD2] p-6 sm:p-8 lg:p-10 shadow-warm hover:shadow-warm-lg transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual / Screenshot Preview */}
        <div className="lg:col-span-7 overflow-hidden rounded-[20px] bg-[#F1EBE1] border border-[#E7DFD2]/60 aspect-[16/10] relative">
          <Link
            href={`/work/${project.slug}`}
            className="block w-full h-full relative focus-visible:outline-2 focus-visible:outline-[#B89B7A] rounded-[20px]"
            aria-label={`View ${project.title} case study`}
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} interface preview`}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover group-hover:scale-[1.025] transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Header row: Status & Year */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={project.status === "Live" ? "live" : "neutral"}>
              {project.status}
            </Badge>
            <span className="text-xs uppercase tracking-widest text-[#6E675D]">
              {project.year}
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#2B2823] mb-3">
            <Link
              href={`/work/${project.slug}`}
              className="hover:text-[#B89B7A] transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-[#6E675D] group-hover:text-[#B89B7A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </h3>

          <p className="text-base text-[#6E675D] leading-relaxed mb-6">
            {project.tagline}
          </p>

          {/* Quiet Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack[0]?.items.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs bg-[#FAF7F2] text-[#6E675D] border border-[#E7DFD2]/90"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[#2B2823] text-[#FAF7F2] hover:bg-[#3E3A33] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
            >
              <span>Read case study</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {hasLiveLink && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#F1EBE1] text-[#2B2823] hover:bg-[#E7DFD2] border border-[#E7DFD2] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                aria-label={`Open ${project.title} live demo in a new tab`}
              >
                <ExternalLink className="w-4 h-4 text-[#6E675D]" />
                <span>Live demo</span>
              </a>
            )}

            {hasGithubLink && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-transparent text-[#2B2823] hover:bg-[#F1EBE1] border border-[#E7DFD2] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                aria-label={`View ${project.title} source code on GitHub, opens in new tab`}
              >
                <GithubIcon className="w-4 h-4 text-[#6E675D]" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
