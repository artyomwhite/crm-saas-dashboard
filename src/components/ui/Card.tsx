import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/50 ${
        hover
          ? "transition-all duration-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
