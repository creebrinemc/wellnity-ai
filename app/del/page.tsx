"use client"

import React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import SupportButton from "@/components/support-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Mail, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/hooks/use-language"

export default function DeleteAccountPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailBody = `
${t.deleteAccount.emailBody}

${t.deleteAccount.form.username}: ${formData.username || t.deleteAccount.notProvided}
${t.deleteAccount.form.email}: ${formData.email || t.deleteAccount.notProvided}
${t.deleteAccount.form.phone}: ${formData.phone || t.deleteAccount.notProvided}

${t.deleteAccount.emailFooter}
    `.trim()

    const subject = t.deleteAccount.emailSubject
    const mailto = `mailto:cagmancinar20+wai@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`

    window.location.href = mailto
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-4">
              <Trash2 className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.deleteAccount.title}</h1>
            <p className="text-lg text-muted-foreground">{t.deleteAccount.subtitle}</p>
          </div>

          {/* Warning Alert */}
          <Alert className="mb-8 border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{t.deleteAccount.warning}</AlertDescription>
          </Alert>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t.deleteAccount.form.title}</CardTitle>
              <CardDescription>{t.deleteAccount.form.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username">{t.deleteAccount.form.username}</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={t.deleteAccount.form.usernamePlaceholder}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t.deleteAccount.form.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.deleteAccount.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.deleteAccount.form.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.deleteAccount.form.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  size="lg"
                  disabled={!formData.username && !formData.email && !formData.phone}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t.deleteAccount.form.submit}
                </Button>

                <p className="text-sm text-muted-foreground text-center">{t.deleteAccount.form.note}</p>
              </form>
            </CardContent>
          </Card>

          {/* Information Section */}
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">{t.deleteAccount.info.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t.deleteAccount.info.point1}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t.deleteAccount.info.point2}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t.deleteAccount.info.point3}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t.deleteAccount.info.point4}</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t.deleteAccount.contact.text}{" "}
              <a href="mailto:cagmancinar20+wai@gmail.com" className="text-primary hover:underline">
                cagmancinar20+wai@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <SupportButton />
    </div>
  )
}
