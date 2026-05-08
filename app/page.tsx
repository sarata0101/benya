"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AssessmentSection } from "@/components/assessment-section"
import { LevelsSection } from "@/components/levels-section"
import { CurriculumSection } from "@/components/curriculum-section"

type Section = "home" | "assessment" | "levels" | "curriculum"

export default function BeniaApp() {
  const [activeSection, setActiveSection] = useState<Section>("home")

  const handleNavigate = (section: string) => {
    setActiveSection(section as Section)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleStartAssessment = () => {
    setActiveSection("assessment")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAssessmentComplete = () => {
    setActiveSection("levels")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleStartLevel = (level: number) => {
    if (level === 1) {
      setActiveSection("curriculum")
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBackToLevels = () => {
    setActiveSection("levels")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {activeSection === "home" && (
        <HeroSection onStartAssessment={handleStartAssessment} />
      )}

      {activeSection === "assessment" && (
        <AssessmentSection onComplete={handleAssessmentComplete} />
      )}

      {activeSection === "levels" && (
        <LevelsSection onStartLevel={handleStartLevel} />
      )}

      {activeSection === "curriculum" && (
        <CurriculumSection onBack={handleBackToLevels} />
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} بنية - منصة التكيف المعرفي. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </main>
  )

  
}
