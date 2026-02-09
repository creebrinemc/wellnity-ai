"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, Smartphone, Brain, Target, Users, Star } from "lucide-react"
import Image from "next/image"
import SupportButton from "@/components/support-button"
import { useLanguage } from "@/hooks/use-language"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">{t.home.badge}</Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {t.home.title}
                  <span className="text-primary"> {t.home.titleHighlight}</span>
                  <br />
                  {t.home.titleEnd}
                </h1>
                <p className="text-xl text-white/80 max-w-lg">{t.home.subtitle}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/signup">
                    {t.home.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/download">
                    <Smartphone className="mr-2 h-5 w-5" />
                    {t.home.downloadApp}
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">{t.home.rating}</p>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=600&width=400"
                  alt="Wellnity AI App Interface"
                  width={400}
                  height={600}
                  className="mx-auto rounded-3xl shadow-2xl border-4 border-primary/20"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.home.whyChoose}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.home.whySubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t.home.features.aiTrainer.title}</CardTitle>
                <CardDescription>{t.home.features.aiTrainer.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>{t.home.features.formCorrection.title}</CardTitle>
                <CardDescription>{t.home.features.formCorrection.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>{t.home.features.community.title}</CardTitle>
                <CardDescription>{t.home.features.community.description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">{t.home.stats.activeUsers}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">{t.home.stats.completedWorkouts}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">{t.home.stats.userSatisfaction}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">{t.home.stats.aiSupport}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.home.ctaSection.title}</h2>
          <p className="text-xl mb-8 opacity-90">{t.home.ctaSection.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/signup">
                {t.home.ctaSection.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              <Link href="/about">{t.home.ctaSection.learnMore}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <SupportButton />
    </div>
  )
}
