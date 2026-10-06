"use client";

import React, { useRef, useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

const buttonVariants = cva(
  // Base styles (apply to all variants)
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#37B4B4] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-[#37B4B4] text-[#082121] hover:bg-[#29E0C8] active:scale-95 shadow-sm hover:shadow-md",
        secondary:
          "border-1.5 border-[#37B4B4] text-[#37B4B4] hover:bg-[#37B4B4]/8 active:scale-95",
        ghost:
          "text-[#082121] hover:bg-[#082121]/5 hover:text-[#37B4B4] active:scale-95",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-sm hover:shadow-md",
        link: "text-[#37B4B4] hover:text-[#29E0C8] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base",
        lg: "h-12 px-6 text-base sm:h-[3rem] sm:px-7 sm:text-lg lg:h-12 lg:px-8",
        icon: "h-10 w-10 px-0 sm:h-11 sm:w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      isDisabled = false,
      fullWidth = false,
      icon: Icon,
      iconPosition = "start",
      enableRipple = variant !== "ghost" && variant !== "link",
      children,
      className,
      onClick,
      type = "button",
      href,
      asChild,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [ripples, setRipples] = useState<
      Array<{ id: number; x: number; y: number }>
    >([]);
    const rippleIdRef = useRef(0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (enableRipple && !isDisabled && !isLoading) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = rippleIdRef.current++;

        setRipples((prev) => [...prev, { id, x, y }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }

      onClick?.(e);
    };

    const baseClasses = buttonVariants({ variant, size });
    const widthClass = fullWidth ? "w-full" : "";
    const disabledClass = isDisabled || isLoading ? "pointer-events-none" : "";

    const classes = `${baseClasses} ${widthClass} ${disabledClass} ${className || ""}`.trim();

    const contentClasses = isLoading ? "opacity-0" : "";

    const buttonContent = (
      <>
        {/* Icon start */}
        {Icon && iconPosition === "start" && !isLoading && (
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        )}

        {/* Loading spinner */}
        {isLoading && <div className={styles.spinner} />}

        {/* Text */}
        <span className={contentClasses}>{children}</span>

        {/* Icon end */}
        {Icon && iconPosition === "end" && !isLoading && (
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        )}

        {/* Ripple effects */}
        {enableRipple &&
          ripples.map((ripple) => (
            <div
              key={ripple.id}
              className={styles.ripple}
              style={{
                width: "20px",
                height: "20px",
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                marginLeft: "-10px",
                marginTop: "-10px",
              }}
            />
          ))}
      </>
    );

    if (href) {
      const linkProps: any = {
        href,
        ref: ref as React.ForwardedRef<HTMLAnchorElement>,
        className: classes,
        ...props,
      };

      if (isDisabled) {
        linkProps.onClick = (e: React.MouseEvent) => e.preventDefault();
      } else {
        linkProps.onClick = handleClick;
      }

      return <Link {...linkProps}>{buttonContent}</Link>;
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        type={type}
        disabled={isDisabled || isLoading}
        className={classes}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";
