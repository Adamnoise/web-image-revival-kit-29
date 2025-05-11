
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "cyber" | "neon-border" | "tech-border" | "brutal" | "glass" | "live"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const baseStyles = "rounded-xl border bg-card text-card-foreground shadow-sm";
  
  const variantStyles = {
    default: baseStyles,
    glass: "rounded-xl bg-black/20 border border-white/10 backdrop-blur-md shadow-lg",
    cyber: "cyber-card bg-[#0A0E1A]/90 border-[#00F5FF]/30 text-white",
    "neon-border": "neon-border bg-[#0A0E1A]/90 text-white backdrop-blur-md",
    "tech-border": "tech-border bg-[#0A0E1A]/90 text-white backdrop-blur-md",
    brutal: "neobrutalism bg-[#0A0E1A] border-[#00F5FF] text-white",
    live: "rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-lg"
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
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "live"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "flex flex-col space-y-1.5 p-6",
    live: "p-4 border-b border-white/5 bg-gradient-to-r from-red-500/10 to-red-600/5 flex items-center justify-between"
  }
  
  return (
    <div
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  )
})
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
