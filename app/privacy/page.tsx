"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import SupportButton from "@/components/support-button"
import { useLanguage } from "@/hooks/use-language"
import { Shield, Lock, Eye, Database, UserCheck, Globe } from "lucide-react"

export default function PrivacyPage() {
  const { t } = useLanguage()

  const sections = [
    {
      icon: Database,
      title: t.privacy.sections.dataCollection.title,
      content: t.privacy.sections.dataCollection.content,
    },
    {
      icon: Shield,
      title: t.privacy.sections.dataUsage.title,
      content: t.privacy.sections.dataUsage.content,
    },
    {
      icon: Lock,
      title: t.privacy.sections.dataSecurity.title,
      content: t.privacy.sections.dataSecurity.content,
    },
    {
      icon: UserCheck,
      title: t.privacy.sections.userRights.title,
      content: t.privacy.sections.userRights.content,
    },
    {
      icon: Eye,
      title: t.privacy.sections.thirdParty.title,
      content: t.privacy.sections.thirdParty.content,
    },
    {
      icon: Globe,
      title: t.privacy.sections.international.title,
      content: t.privacy.sections.international.content,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.privacy.title}</h1>
            <p className="text-lg text-muted-foreground">{t.privacy.lastUpdated}</p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-muted-foreground text-lg leading-relaxed">{t.privacy.introduction}</p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <div key={index} className="bg-card border border-border rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                      <div className="text-muted-foreground space-y-4">
                        {Array.isArray(section.content) ? (
                          section.content.map((paragraph, idx) => (
                            <p key={idx} className="leading-relaxed">
                              {paragraph}
                            </p>
                          ))
                        ) : (
                          <p className="leading-relaxed">{section.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t.privacy.contact.title}</h2>
            <p className="text-muted-foreground mb-6">{t.privacy.contact.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t.privacy.contact.email}</p>
                <a href="mailto:privacy@wellnityai.com" className="text-primary font-medium hover:underline">
                  privacy@wellnityai.com
                </a>
              </div>
              <div className="sm:ml-8">
                <p className="text-sm text-muted-foreground">{t.privacy.contact.address}</p>
                <p className="text-foreground">123 Fitness Street, San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SupportButton />
    </div>
  )
}
