"use client"

import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "white" | "dark"
  showText?: boolean
}

export function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative" style={{ width: sizeMap[size], height: sizeMap[size] }}>
        <Image
          src="/images/wellnity-logo.png"
          alt="Wellnity AI Logo"
          width={sizeMap[size]}
          height={sizeMap[size]}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="hidden sm:flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]} text-foreground leading-tight tracking-tight`}>
            Well<span className="text-primary">nity</span>
          </span>
          <span
            className={`font-semibold text-primary ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg"} leading-none tracking-wider opacity-90`}
          >
            AI
          </span>
        </div>
      )}
    </div>
  )
}
