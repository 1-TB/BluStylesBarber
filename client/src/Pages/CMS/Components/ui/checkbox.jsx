import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "./cn";

const Checkbox = React.forwardRef(({ className, onCheckedChange, checked, ...props }, ref) => {
  const handleChange = (e) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={handleChange}
        className={cn(
          "peer appearance-none h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:border-primary",
          className
        )}
        {...props}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-primary-foreground opacity-0 peer-checked:opacity-100">
        <Check className="h-4 w-4" />
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
