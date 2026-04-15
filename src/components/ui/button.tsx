import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.96] select-none w-full sm:w-auto",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-l from-[#E91614] to-[#E05D31] text-white hover:opacity-90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-gradient-to-bl from-[#E91614] to-[#E05D31] hover:text-white hover:border-transparent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-gradient-to-b from-[#E91614] to-[#E05D31] hover:text-white",
        pureDefault: "w-auto",
        link: "text-primary underline-offset-4 hover:underline w-auto",
        filter: "outline outline-1 outline-offset-[-0.87px] outline-neutral-400 bg-white text-zinc-600 hover:bg-gray-50",
        filterActive: "bg-gradient-to-b from-[#E91614] to-[#E05D31] text-white",
        details: "bg-gradient-to-l from-[#E91614] to-[#E05D31] text-white rounded-lg font-semibold hover:opacity-95 transition-all duration-300 shadow-md",
        white: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow-sm",
        // NEW CUSTOM VARIANT: Removes all background/border logic for full control
        custom: "", 
        getAssistance:"border border-input hover:bg-gradient-to-bl from-[#E91614] to-[#E05D31] hover:text-white hover:border-transparent",
      },
      size: {
        default: "h-10 px-3 sm:px-4 py-2",
        sm: "h-9 rounded-md px-2.5 sm:px-3 text-xs",
        lg: "h-11 rounded-md px-6 sm:px-8 text-sm sm:text-base",
        icon: "h-10 w-10 sm:h-11 sm:w-11",
        filter: "px-4 md:px-7 py-2.5 text-xs sm:text-sm",
        none: "w-auto h-auto",
        // NEW CUSTOM SIZE: Removes all height/padding logic
        custom: "", 
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };