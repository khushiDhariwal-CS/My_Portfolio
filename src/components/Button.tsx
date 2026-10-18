import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  isExternal?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  download?: boolean | string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  isExternal = false,
  disabled = false,
  type = "button",
  ariaLabel,
  download,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus-visible:outline-2 focus-visible:outline-[#B89B7A] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-4 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#2B2823] text-[#FAF7F2] hover:bg-[#3E3A33] shadow-sm hover:shadow",
    secondary:
      "bg-[#F1EBE1] text-[#2B2823] hover:bg-[#E7DFD2] border border-[#E7DFD2]",
    outline:
      "bg-white/80 text-[#2B2823] border border-[#E7DFD2] hover:bg-white hover:border-[#B89B7A]/50 shadow-warm-sm",
    ghost:
      "bg-transparent text-[#6E675D] hover:text-[#2B2823] hover:bg-[#F1EBE1]/60",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          aria-label={ariaLabel}
          download={download}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel}
        download={download}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
