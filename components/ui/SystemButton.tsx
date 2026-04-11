"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";

interface SystemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  className?: string;
}

export function SystemButton({
  variant = "primary",
  size = "md",
  icon,
  children,
  fullWidth,
  href,
  className,
  ...props
}: SystemButtonProps) {
  const baseClasses = clsx(
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && "w-full",
    className
  );

  const innerContent = (
    <>
      <span className="btn-text">{children}</span>
      {icon && <span className="btn-icon-circle">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {innerContent}
    </button>
  );
}
