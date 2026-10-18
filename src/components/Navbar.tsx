"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { links } from "@/data/links";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: isHomePage ? "#about" : "/#about" },
    { label: "Work", href: isHomePage ? "#work" : "/#work" },
    { label: "Experience", href: isHomePage ? "#experience" : "/#experience" },
    { label: "Skills", href: isHomePage ? "#skills" : "/#skills" },
    { label: "Contact", href: isHomePage ? "#contact" : "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#E7DFD2]/70 shadow-warm-sm py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-lg font-medium text-[#2B2823] tracking-tight focus-visible:outline-2 focus-visible:outline-[#B89B7A] focus-visible:outline-offset-4 rounded-md"
            aria-label="Khushi Dhariwal - Home"
          >
            <span className="w-8 h-8 rounded-full bg-[#F1EBE1] border border-[#E7DFD2] flex items-center justify-center text-xs font-semibold text-[#2B2823] group-hover:border-[#B89B7A]/50 transition-colors">
              KD
            </span>
            <span className="hover:text-[#6E675D] transition-colors">
              Khushi Dhariwal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#6E675D] hover:text-[#2B2823] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A] focus-visible:outline-offset-4 rounded-md font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Download Resume */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={links.resume}
              download="Khushi_Dhariwal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-[#F1EBE1] text-[#2B2823] hover:bg-[#E7DFD2] border border-[#E7DFD2] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
              aria-label="Download ATS Resume PDF, opens in new tab or downloads"
            >
              <Download className="w-3.5 h-3.5 text-[#6E675D]" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#2B2823] hover:bg-[#F1EBE1] focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg md:hidden pt-24 px-6 flex flex-col justify-between pb-10 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest text-[#6E675D]">Navigation</span>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-light text-[#2B2823] hover:text-[#B89B7A] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#E7DFD2] flex flex-col gap-4">
            <a
              href={links.resume}
              download="Khushi_Dhariwal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-medium bg-[#2B2823] text-[#FAF7F2]"
              aria-label="Download ATS Resume PDF"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
            <div className="text-center text-xs text-[#6E675D]">
              Ghaziabad, Uttar Pradesh · kdhariwal44@gmail.com
            </div>
          </div>
        </div>
      )}
    </>
  );
}
