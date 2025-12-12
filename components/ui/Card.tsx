import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = "", noPadding = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`bg-card text-card-foreground rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow ${noPadding ? "" : "p-6"} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";
