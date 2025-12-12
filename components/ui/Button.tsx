import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & { href?: string }>(
    ({ className = "", variant = "primary", size = "md", isLoading, href, children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        // Gradient: from Brand Purple (#7A3FFF) to Accent (#C86DD7)
        // Primary: Gradient fill, white text
        // Secondary: Solid purple, white text
        // Tertiary: Outline style (Purple border? Or Gray? Usually primary color or gray. Let's start with primary border).

        const variants = {
            primary: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg",
            secondary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            tertiary: "border border-input bg-transparent hover:bg-muted text-foreground",
            ghost: "hover:bg-muted text-foreground",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2 text-sm",
            lg: "h-12 px-8 text-base",
        };

        const variantStyles = variants[variant];
        const sizeStyles = sizes[size];
        const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;

        if (href) {
            return (
                <Link
                    href={href}
                    className={combinedClassName}
                >
                    {isLoading ? (
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : null}
                    {children}
                </Link>
            );
        }

        return (
            <button
                // @ts-ignore
                ref={ref}
                className={combinedClassName}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
