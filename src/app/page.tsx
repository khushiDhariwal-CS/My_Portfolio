import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/Icons";
import { siteConfig } from "@/data/site";
import { links } from "@/data/links";
import { projects } from "@/data/projects";
import { Container, Section } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { Badge } from "@/components/Badge";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 sm:pt-44 md:pt-48 pb-20 md:pb-28 w-full">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow & Availability */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
                  Full Stack Developer
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7DFD2]" />
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2A4D45] bg-[#EDF3F1] px-3 py-1 rounded-full border border-[#8FA9A3]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#347868] animate-pulse" />
                  {siteConfig.availability}
                </span>
              </div>

              {/* Statement Heading */}
              <h1 className="text-[clamp(2.75rem,6vw,5.75rem)] font-light tracking-[-0.035em] text-[#2B2823] leading-[1.08] mb-6">
                I build <span className="font-normal">thoughtful</span> web products, from interface to database.
              </h1>

              {/* Supporting Line */}
              <p className="text-lg sm:text-xl text-[#6E675D] leading-relaxed max-w-xl mb-10 font-normal">
                {siteConfig.heroSubtitle}
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-[#2B2823] text-[#FAF7F2] hover:bg-[#3E3A33] transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                >
                  <span>View selected work</span>
                  <ArrowDown className="w-4 h-4 text-[#B89B7A]" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium bg-[#F1EBE1] text-[#2B2823] hover:bg-[#E7DFD2] border border-[#E7DFD2] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                >
                  <span>Get in touch</span>
                </a>

                <a
                  href={links.resume}
                  download="Khushi_Dhariwal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium bg-white text-[#2B2823] hover:bg-[#F8F5F0] border border-[#E7DFD2] transition-colors shadow-warm-sm focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                  aria-label="Download ATS Resume PDF"
                >
                  <Download className="w-4 h-4 text-[#6E675D]" />
                  <span>Resume PDF</span>
                </a>
              </div>

              {/* Location indicator */}
              <div className="flex items-center gap-2 text-xs text-[#6E675D]">
                <MapPin className="w-3.5 h-3.5 text-[#B89B7A]" />
                <span>Ghaziabad, Uttar Pradesh · Open to Delhi NCR &amp; Remote</span>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[28px] overflow-hidden bg-[#F1EBE1] border border-[#E7DFD2] shadow-warm p-2">
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-white">
                  <Image
                    src="/khushi.jpg"
                    alt="Khushi Dhariwal - Full Stack Developer"
                    fill
                    priority
                    sizes="(max-width: 1024px) 360px, 420px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. ABOUT & QUIET FACTS SECTION */}
      <Section id="about" className="bg-[#F1EBE1]/50 border-y border-[#E7DFD2]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Heading & Human Paragraph */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
                About Khushi
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#2B2823] leading-snug">
                Engineering resilient web architectures with clean code and thoughtful product craft.
              </h2>
              <p className="text-base sm:text-lg text-[#6E675D] leading-relaxed">
                {siteConfig.aboutBio}
              </p>
              <p className="text-sm sm:text-base text-[#6E675D] leading-relaxed italic border-l-2 border-[#B89B7A] pl-4">
                &ldquo;I believe software should be calm, robust, and dependable—from the ergonomics of the user interface down to database indexing and server-rendered response times.&rdquo;
              </p>
            </div>

            {/* Right Column: Three Quiet Facts & Education */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Quiet Facts Cards */}
              <div className="grid grid-cols-1 gap-3.5">
                {siteConfig.quietFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="bg-white rounded-[20px] p-5 border border-[#E7DFD2] shadow-warm-sm flex items-center justify-between"
                  >
                    <span className="text-xs uppercase tracking-wider text-[#6E675D]">
                      {fact.label}
                    </span>
                    <span className="text-sm font-medium text-[#2B2823]">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Education Summary */}
              <div className="bg-white rounded-[24px] p-6 border border-[#E7DFD2] shadow-warm-sm flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E7DFD2]/70">
                  <GraduationCap className="w-4 h-4 text-[#B89B7A]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2B2823]">
                    Education
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {siteConfig.education.map((edu, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-sm font-medium text-[#2B2823]">
                          {edu.degree}
                        </h4>
                        <span className="text-xs text-[#6E675D] flex-shrink-0">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-xs text-[#6E675D] mt-0.5">
                        {edu.institution} ({edu.boardOrAffiliation})
                      </p>
                      <p className="text-xs font-medium text-[#B89B7A] mt-1">
                        {edu.score}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. SELECTED WORK SECTION */}
      <Section id="work">
        <Container>
          <div className="flex flex-col gap-4 mb-12 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
              Selected Project
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#2B2823]">
                Proven full-stack implementation.
              </h2>
              <span className="text-xs text-[#6E675D]">
                Deployed and verified in production
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {projects.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} priority={idx === 0} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. EXPERIENCE TIMELINE SECTION */}
      <Section id="experience" className="bg-[#F1EBE1]/40 border-t border-[#E7DFD2]">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col gap-12">
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
                Work History
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#2B2823]">
                Practical engineering experience.
              </h2>
            </div>

            <div className="relative border-l border-[#E7DFD2] ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12">
              {siteConfig.experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors ${
                      exp.isCurrent
                        ? "bg-[#2B2823] border-[#FAF7F2] ring-4 ring-[#E7DFD2]"
                        : "bg-white border-[#B89B7A]"
                    }`}
                  />

                  {/* Experience Card */}
                  <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E7DFD2] shadow-warm-sm transition-all duration-200 hover:shadow-warm">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                      <h3 className="text-xl font-medium text-[#2B2823]">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-medium text-[#B89B7A] tracking-wide">
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#6E675D] mb-5">
                      <Briefcase className="w-3.5 h-3.5 text-[#6E675D]" />
                      <span className="font-medium text-[#2B2823]">{exp.company}</span>
                      <span>·</span>
                      <span>{exp.type}</span>
                    </div>

                    <ul className="space-y-2.5">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-sm text-[#6E675D] leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B89B7A] mt-2 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. SKILLS & CERTIFICATIONS SECTION */}
      <Section id="skills">
        <Container>
          <div className="flex flex-col gap-4 mb-12 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
              Technical Repertoire
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#2B2823]">
              Modern web stack &amp; core computer science.
            </h2>
            <p className="text-sm text-[#6E675D] max-w-xl">
              Specialized in the full lifecycle of full-stack TypeScript and JavaScript applications, from performant user interfaces to secure cloud backends.
            </p>
          </div>

          {/* Grouped Skills Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.skillGroups.map((group) => (
              <div
                key={group.category}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E7DFD2] shadow-warm-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B89B7A] mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#FAF7F2] text-[#2B2823] border border-[#E7DFD2]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Certifications Card in same grid */}
            <div className="bg-[#FAF7F2] rounded-[24px] p-6 sm:p-7 border border-[#E7DFD2] shadow-warm-sm flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B89B7A] mb-4">
                  Certifications &amp; Training
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {siteConfig.certifications.map((cert, idx) => (
                    <div key={idx} className="flex flex-col bg-white p-3.5 rounded-[16px] border border-[#E7DFD2]">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-[#2B2823]">
                          {cert.title}
                        </span>
                        {cert.year && (
                          <span className="text-xs text-[#6E675D] flex-shrink-0">
                            {cert.year}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#6E675D] mt-1">{cert.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. CODING PROFILES SECTION */}
      <Section className="bg-[#F1EBE1]/40 border-y border-[#E7DFD2]">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
                Coding Profiles
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2B2823]">
                Consistent practice &amp; open-source contributions.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {/* GitHub */}
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-[24px] p-6 border border-[#E7DFD2] shadow-warm-sm hover:shadow-warm transition-all flex flex-col items-start text-left focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                aria-label="GitHub profile, opens in a new tab"
              >
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E7DFD2] flex items-center justify-center text-[#2B2823]">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6E675D] group-hover:text-[#B89B7A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-lg font-medium text-[#2B2823] mb-1">
                  GitHub Profile
                </h3>
                <p className="text-xs font-mono text-[#B89B7A] mb-2">
                  github.com/khushiDhariwal-CS
                </p>
                <p className="text-xs text-[#6E675D] leading-relaxed">
                  Full-stack repositories, project codebases, commits, and collaborative Git branches.
                </p>
              </a>

              {/* LeetCode */}
              <a
                href={links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-[24px] p-6 border border-[#E7DFD2] shadow-warm-sm hover:shadow-warm transition-all flex flex-col items-start text-left focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                aria-label="LeetCode profile, opens in a new tab"
              >
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E7DFD2] flex items-center justify-center text-[#2B2823]">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6E675D] group-hover:text-[#B89B7A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-lg font-medium text-[#2B2823] mb-1">
                  LeetCode Profile
                </h3>
                <p className="text-xs font-mono text-[#B89B7A] mb-2">
                  leetcode.com/u/khushi_dhariwal
                </p>
                <p className="text-xs text-[#6E675D] leading-relaxed">
                  Data Structures and Algorithms practice with clean Java and JavaScript problem solutions.
                </p>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. CONTACT SECTION */}
      <Section id="contact">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct contact info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E675D]">
                Get in Touch
              </span>
              <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#2B2823] leading-tight">
                Let&apos;s build something exceptional.
              </h2>
              <p className="text-base text-[#6E675D] leading-relaxed">
                Currently open to Software Development Engineer (SDE) and Full Stack Developer opportunities in Noida, Gurgaon, Delhi NCR, Mohali, Chandigarh, or remote.
              </p>

              <div className="flex flex-col gap-4 pt-4 border-t border-[#E7DFD2]">
                {/* Email */}
                <a
                  href={links.email}
                  className="flex items-center gap-3.5 text-sm text-[#2B2823] hover:text-[#B89B7A] transition-colors group"
                  aria-label="Send email to Khushi Dhariwal"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F1EBE1] border border-[#E7DFD2] flex items-center justify-center group-hover:border-[#B89B7A]/50 transition-colors">
                    <Mail className="w-4 h-4 text-[#2B2823]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6E675D] block">
                      Direct Email
                    </span>
                    <span className="font-medium text-sm">kdhariwal44@gmail.com</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={links.phone}
                  className="flex items-center gap-3.5 text-sm text-[#2B2823] hover:text-[#B89B7A] transition-colors group"
                  aria-label="Call Khushi Dhariwal"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F1EBE1] border border-[#E7DFD2] flex items-center justify-center group-hover:border-[#B89B7A]/50 transition-colors">
                    <Phone className="w-4 h-4 text-[#2B2823]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6E675D] block">
                      Phone
                    </span>
                    <span className="font-medium text-sm">+91-7668592309</span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-sm text-[#2B2823] hover:text-[#B89B7A] transition-colors group"
                  aria-label="Connect on LinkedIn, opens in a new tab"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F1EBE1] border border-[#E7DFD2] flex items-center justify-center group-hover:border-[#B89B7A]/50 transition-colors">
                    <LinkedinIcon className="w-4 h-4 text-[#2B2823]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6E675D] block">
                      LinkedIn
                    </span>
                    <span className="font-medium text-sm">khushi-dhariwal</span>
                  </div>
                </a>

                {/* Resume Download */}
                <a
                  href={links.resume}
                  download="Khushi_Dhariwal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-sm text-[#2B2823] hover:text-[#B89B7A] transition-colors group"
                  aria-label="Download ATS Resume PDF"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F1EBE1] border border-[#E7DFD2] flex items-center justify-center group-hover:border-[#B89B7A]/50 transition-colors">
                    <Download className="w-4 h-4 text-[#2B2823]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6E675D] block">
                      Curriculum Vitae
                    </span>
                    <span className="font-medium text-sm">Download Resume (PDF)</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Working Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
