
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "cyber" | "neon-border" | "tech-border" | "brutal"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const baseStyles = "rounded-lg border bg-card text-card-foreground shadow-sm";
  
  const variantStyles = {
    default: baseStyles,
    cyber: "cyber-card bg-[#0A0E1A]/90 border-[#00F5FF]/30 text-white",
    "neon-border": "neon-border bg-[#0A0E1A]/90 text-white backdrop-blur-md",
    "tech-border": "tech-border bg-[#0A0E1A]/90 text-white backdrop-blur-md",
    brutal: "neobrutalism bg-[#0A0E1A] border-[#00F5FF] text-white"
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    variant?: "default" | "cyber" | "glitch"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "text-2xl font-semibold leading-none tracking-tight",
    cyber: "text-2xl font-bold leading-none tracking-tight cyber-heading",
    glitch: "text-2xl font-bold leading-none tracking-tight glitch-text"
  }
  
  return (
    <h3
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
