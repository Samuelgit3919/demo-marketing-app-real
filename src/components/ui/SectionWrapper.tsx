import React from "react";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function SectionWrapper({ children, className, ...props }: SectionWrapperProps) {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
}
