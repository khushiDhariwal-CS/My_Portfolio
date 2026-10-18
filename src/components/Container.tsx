import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({ children, className = "", size = "default" }: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-[1120px]",
    wide: "max-w-6xl",
  };

  return (
    <div className={`mx-auto px-6 sm:px-8 lg:px-10 w-full ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  spacing?: "default" | "tight" | "spacious";
}

export function Section({ id, children, className = "", spacing = "default" }: SectionProps) {
  const spacingClasses = {
    tight: "py-16 md:py-20",
    default: "py-24 md:py-32 lg:py-36",
    spacious: "py-32 md:py-40 lg:py-48",
  };

  return (
    <section id={id} className={`relative w-full ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
