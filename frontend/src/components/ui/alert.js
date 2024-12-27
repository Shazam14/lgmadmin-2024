// src/components/ui/alert.jsx

import React from "react";
import { cn } from "../../lib/utils";

const Alert = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4",
        {
          "bg-background text-foreground": variant === "default",
          "bg-destructive/15 text-destructive border-destructive/50":
            variant === "destructive",
        },
        className
      )}
      {...props}
    />
  )
);

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));

export { Alert, AlertDescription };
