
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
        // Simplified variants based on Orbit Dashboard
        cyber: 
          "border border-primary text-primary bg-primary/5 hover:bg-primary/10",
        "cyber-purple":
          "border border-purple-500 text-purple-500 bg-purple-500/5 hover:bg-purple-500/10",
        "cyber-yellow":
          "border border-yellow-400 text-yellow-400 bg-yellow-400/5 hover:bg-yellow-400/10",
        "cyber-pill":
          "border border-primary text-primary bg-[#111420] px-3 py-1 backdrop-blur-sm",
        // New variants
        "blue": 
          "border-transparent bg-blue-500 text-white hover:bg-blue-500/90",
        "red": 
          "border-transparent bg-red-500 text-white hover:bg-red-500/90",
        "green": 
          "border-transparent bg-green-500 text-white hover:bg-green-500/90",
        glitch:
          "border border-primary text-primary bg-primary/5",
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
