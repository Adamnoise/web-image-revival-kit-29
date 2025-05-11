
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#3b82f6] text-white hover:bg-[#3b82f6]/90 transition-all duration-300",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-white/10 bg-black/20 hover:bg-white/5 text-white transition-all duration-300",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New cyberpunk variants
        cyber: "bg-transparent border border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/10 hover:shadow-glow-blue-sm transition-all duration-300",
        "cyber-filled": "bg-[#00F5FF] text-[#070A14] hover:bg-[#00F5FF]/90 hover:shadow-glow-blue-sm transition-all duration-300",
        "cyber-purple": "bg-transparent border border-[#B026FF] text-[#B026FF] hover:bg-[#B026FF]/10 hover:shadow-glow-purple-sm transition-all duration-300",
        "cyber-yellow": "bg-transparent border border-[#FAFF00] text-[#FAFF00] hover:bg-[#FAFF00]/10 hover:shadow-glow-yellow-sm transition-all duration-300",
        // New IQON-style buttons
        "iqon-primary": "bg-[#070A14] border border-[#00F5FF]/50 text-[#00F5FF] hover:bg-[#00F5FF]/10 hover:shadow-glow-blue-sm transition-all duration-300",
        "iqon-secondary": "bg-[#00F5FF]/10 text-[#00F5FF] hover:bg-[#00F5FF]/20 hover:shadow-glow-blue-sm transition-all duration-300",
        "iqon-accent": "bg-gradient-to-r from-[#00F5FF] to-[#0099FF] text-[#070A14] font-medium hover:shadow-glow-blue-sm transition-all duration-300",
        // New icon button from brandbook
        "icon-round": "h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
