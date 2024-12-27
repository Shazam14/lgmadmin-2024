// src/components/ui/label.jsx
import React from "react";

const Label = React.forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none ${props.disabled ? "cursor-not-allowed opacity-70" : ""} ${className}`}
      {...props}
    >
      {children}
    </label>
  )
);

Label.displayName = "Label";

export { Label };
