"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/Icons";
import { links } from "@/data/links";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { label: "GitHub", href: links.github, icon: GithubIcon },
    { label: "LinkedIn", href: links.linkedin, icon: LinkedinIcon },
    { label: "LeetCode", href: links.leetcode, icon: LeetCodeIcon },
    { label: "Email", href: links.email, icon: Mail },
    { label: "Phone", href: links.phone, icon: Phone },
  ];

  return (
    <footer className="w-full bg-[#F1EBE1] border-t border-[#E7DFD2] py-14 sm:py-16">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-[#E7DFD2]">
          <div>
            <Link
              href="/"
              className="text-lg font-medium text-[#2B2823] tracking-tight hover:text-[#B89B7A] transition-colors"
            >
              Khushi Dhariwal
            </Link>
            <p className="text-sm text-[#6E675D] mt-1">
              Full Stack Developer (MERN, Next.js) · Ghaziabad, Uttar Pradesh
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-full bg-white border border-[#E7DFD2] flex items-center justify-center text-[#2B2823] hover:text-[#B89B7A] hover:border-[#B89B7A]/50 transition-colors shadow-warm-sm focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
                aria-label={`${label} profile`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7DFD2] text-xs font-medium text-[#2B2823] hover:text-[#B89B7A] transition-colors shadow-warm-sm ml-2 focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E675D]">
          <p>© 2026 Khushi Dhariwal. Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
          <p className="flex items-center gap-2">
            <span>Designed for quiet clarity &amp; performance</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
