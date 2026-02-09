"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Mail, Phone, MessageSquare, HelpCircle, Clock, Users } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function SupportButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  // ... rest of the component code stays the same ...

  return (
    <>
      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
            aria-label={t.support.title}
          >
            <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform duration-200" />
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
          </Button>
        )}

        {/* Enhanced Support Panel */}
        {isOpen && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <Card className="w-96 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundRepeat: "repeat",
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">{t.support.title}</CardTitle>
                      <CardDescription className="text-white/80 text-sm">{t.support.subtitle}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
                    aria-label="Close support panel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Status Indicators */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <Badge className="bg-primary/20 text-primary text-xs font-medium">{t.support.onlineNow}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{t.support.avgResponse}</span>
                  </div>
                </div>

                {/* Support Options */}
                <div className="space-y-3">
                  {/* Live Chat */}
                  <Button
                    onClick={() => {
                      alert("Live chat would open here in a real implementation")
                      setIsOpen(false)
                    }}
                    className="w-full justify-start bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 border border-primary/30 text-foreground h-auto p-4 transition-all duration-200"
                    variant="outline"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm">{t.support.liveChat.title}</div>
                        <div className="text-xs text-muted-foreground">{t.support.liveChat.description}</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-primary">
                        <Users className="h-3 w-3" />
                        <span>24/7</span>
                      </div>
                    </div>
                  </Button>

                  {/* Email Support */}
                  <Button
                    onClick={() => {
                      window.open("mailto:support@wellnityai.com?subject=Support Request", "_blank")
                      setIsOpen(false)
                    }}
                    className="w-full justify-start bg-gradient-to-r from-secondary/10 to-secondary/20 hover:from-secondary/20 hover:to-secondary/30 border border-secondary/30 text-foreground h-auto p-4 transition-all duration-200"
                    variant="outline"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm">{t.support.emailSupport.title}</div>
                        <div className="text-xs text-muted-foreground font-mono">{t.support.emailSupport.description}</div>
                      </div>
                      <div className="text-xs text-secondary">
                        <Clock className="h-3 w-3" />
                      </div>
                    </div>
                  </Button>

                  {/* Phone Support */}
                  <Button
                    onClick={() => {
                      window.open("tel:+15551234567", "_blank")
                      setIsOpen(false)
                    }}
                    className="w-full justify-start bg-gradient-to-r from-accent/10 to-accent/20 hover:from-accent/20 hover:to-accent/30 border border-accent/30 text-foreground h-auto p-4 transition-all duration-200"
                    variant="outline"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm">{t.support.phoneSupport.title}</div>
                        <div className="text-xs text-muted-foreground font-mono">{t.support.phoneSupport.description}</div>
                      </div>
                      <div className="text-xs text-accent">
                        <span>Call</span>
                      </div>
                    </div>
                  </Button>

                  {/* Help Center */}
                  <Button
                    onClick={() => {
                      alert("Help center would open here")
                      setIsOpen(false)
                    }}
                    className="w-full justify-start bg-gradient-to-r from-muted to-muted hover:from-muted hover:to-muted/80 border border-border text-foreground h-auto p-4 transition-all duration-200"
                    variant="outline"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm">{t.support.helpCenter.title}</div>
                        <div className="text-xs text-muted-foreground">{t.support.helpCenter.description}</div>
                      </div>
                      <div className="text-xs text-primary">
                        <span>Browse</span>
                      </div>
                    </div>
                  </Button>
                </div>

                {/* Emergency Contact */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-semibold text-red-800">Emergency Support</span>
                    </div>
                    <p className="text-xs text-red-700">
                      {t.support.emergency}{" "}
                      <button
                        onClick={() => window.open("tel:+15551234567", "_blank")}
                        className="font-semibold underline hover:no-underline"
                      >
                        +1 (555) 123-4567
                      </button>
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-primary">2min</div>
                    <div className="text-xs text-muted-foreground">Avg Response</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-primary">98%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}

// Export both default and named for compatibility


// Add both named and default exports for compatibility
