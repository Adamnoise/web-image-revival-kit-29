
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Cyber variants with the updated colors
        cyber: 
          "border border-[#00F5FF] text-[#00F5FF] bg-[#00F5FF]/5 hover:bg-[#00F5FF]/10 hover:shadow-glow-blue-sm",
        "cyber-purple":
          "border border-[#B026FF] text-[#B026FF] bg-[#B026FF]/5 hover:bg-[#B026FF]/10 hover:shadow-glow-purple-sm",
        "cyber-yellow":
          "border border-[#FAFF00] text-[#FAFF00] bg-[#FAFF00]/5 hover:bg-[#FAFF00]/10 hover:shadow-glow-yellow-sm",
        "cyber-pill":
          "border border-[#00F5FF] text-[#00F5FF] bg-[#070A14] px-3 py-1 backdrop-blur-sm",
        // New variants from the brandbook
        "blue": 
          "border-transparent bg-[#3b82f6] text-white hover:bg-[#3b82f6]/90",
        "red": 
          "border-transparent bg-[#ef4444] text-white hover:bg-[#ef4444]/90 animate-pulse",
        "green": 
          "border-transparent bg-[#10b981] text-white hover:bg-[#10b981]/90",
        glitch:
          "border border-[#00F5FF] text-[#00F5FF] bg-[#00F5FF]/5 animate-glitch",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
