"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    style={{
      background: props.checked
        ? "linear-gradient(90deg, #E05D31 0%, #E91614 100%)"
        : "#F9F6F6",
    }}
    className={cn(
      "peer inline-flex h-7 w-[3rem] shrink-0 cursor-pointer items-center rounded-lg border-0 shadow-inner transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[1rem] w-[1rem] rounded-md bg-white shadow-md ring-0 transition-transform duration-200 data-[state=checked]:translate-x-[1.7rem] data-[state=unchecked]:translate-x-[0.3rem]"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
