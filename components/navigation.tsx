"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "@/hooks/use-language"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
              {t.nav.pricing}
            </Link>
            <Link href="/download" className="text-muted-foreground hover:text-primary transition-colors">
              {t.nav.download}
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
            <Button asChild variant="ghost">
              <Link href="/login">{t.nav.login}</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/signup">{t.nav.getStarted}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.pricing}
              </Link>
              <Link
                href="/download"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.download}
              </Link>
              <div className="pt-4 pb-2 space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    {t.nav.login}
                  </Link>
                </Button>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    {t.nav.getStarted}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
