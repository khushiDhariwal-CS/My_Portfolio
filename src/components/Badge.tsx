import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "accent" | "live" | "outline";
  className?: string;
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  const variantStyles = {
    neutral: "bg-[#F1EBE1] text-[#2B2823] border border-[#E7DFD2]/80",
    accent: "bg-[#FAF7F2] text-[#B89B7A] border border-[#B89B7A]/30 font-medium",
    live: "bg-[#EDF3F1] text-[#2A4D45] border border-[#8FA9A3]/40 font-medium",
    outline: "bg-transparent text-[#6E675D] border border-[#E7DFD2]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-wide transition-colors ${variantStyles[variant]} ${className}`}
    >
      {variant === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#347868] animate-pulse" />
      )}
      {children}
    </span>
  );
}
