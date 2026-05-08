"use client"

import { Lock, BookOpen, Blocks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LevelsSectionProps {
  onStartLevel: (level: number) => void
}

const levels = [
  {
    id: 1,
    title: "المستوى الأول",
    subtitle: "ابِنْيَة التمييز ",
    description: "الأساس الطبي/النفسي: معايير الـ (CDC Milestones) و(Vineland Scales) الخاصة بالتمييز البصري والحسي الأساسي.",
    blocks: 1,
    available: true,
  },
  {
    id: 2,
    title: "المستوى الثاني",
    subtitle: "البناء المتدرج",
    description: "تعزيز القدرات الأساسية مع تقديم استراتيجيات تكيفية.",
    blocks: 2,
    available: false,
  },
  {
    id: 3,
    title: "المستوى الثالث",
    subtitle: "البناء المتوسط",
    description: "تطوير نقاط القوة ومعالجة التحديات بطرق متنوعة.",
    blocks: 3,
    available: false,
  },
  {
    id: 4,
    title: "المستوى الرابع",
    subtitle: "البناء المتقدم",
    description: "صقل المهارات المعرفية وتوسيع القدرات.",
    blocks: 4,
    available: false,
  },
  {
    id: 5,
    title: "المستوى الخامس",
    subtitle: "البناء المتميز",
    description: "تحديات متقدمة لتطوير المهارات المعرفية العليا.",
    blocks: 5,
    available: false,
  },
]

function BuildingBlocks({ count, available }: { count: number; available: boolean }) {
  return (
    <div className="flex items-end justify-center gap-1 h-16">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-6 rounded-t transition-all ${
            i < count
              ? available
                ? "bg-primary"
                : "bg-muted-foreground/30"
              : "bg-border"
          }`}
          style={{ height: `${(i + 1) * 10 + 10}px` }}
        />
      ))}
    </div>
  )
}

export function LevelsSection({ onStartLevel }: LevelsSectionProps) {
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Blocks className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-primary mb-4">
            مستويات التعلم
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            خمسة مستويات مصممة بعناية لتناسب احتياجاتك المعرفية. كل مستوى يبني على السابق.
          </p>
        </div>

        {/* Levels Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {levels.map((level) => (
    <Card
      key={level.id}
      className={`relative overflow-hidden transition-all ${
        level.available
          ? "border-primary/30 hover:border-primary hover:shadow-lg"
          : "border-border opacity-80"
      }`}
    >
      {!level.available && (
        <div className="absolute top-4 left-4">
          {/* كلمة قيد التطوير بالخط الفرعي برضه عشان تبقى رقيقة */}
          <div className="flex items-center gap-2 bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full font-['KufyanArabic']">
            <Lock className="w-3 h-3" />
            قيد التطوير
          </div>
        </div>
      )}

      <CardHeader className="pb-2">
        <BuildingBlocks count={level.blocks} available={level.available} />
      </CardHeader>

      <CardContent className="pt-4">
        <div className="text-center">
          {/* تغيير الخط هنا للفرعي (Kufyan) */}
          <CardTitle className="font-['KufyanArabic'] text-xl mb-1">
            {level.title}
          </CardTitle>
          
          {/* تغيير الخط هنا للفرعي (Kufyan) */}
          <p className={`text-sm font-medium mb-3 font-['KufyanArabic'] ${
            level.available ? "text-primary" : "text-muted-foreground"
          }`}>
            {level.subtitle}
          </p>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-['TheSansArabic']">
            {level.description}
          </p>

          {level.available ? (
            <Button
              onClick={() => onStartLevel(level.id)}
              className="w-full gap-2 bg-primary hover:bg-primary/90 font-['KufyanArabic']"
            >
              <BookOpen className="w-4 h-4" />
              ابدأ التعلم
            </Button>
          ) : (
            <Button
              variant="outline"
              disabled
              className="w-full gap-2 font-['KufyanArabic']"
            >
              <Lock className="w-4 h-4" />
              قريباً
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  ))}
</div>

        {/* Info Banner */}
        <div className="mt-12 bg-secondary/10 rounded-2xl p-6 sm:p-8 border border-secondary/20">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Blocks className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-[var(--font-heading)] text-lg font-bold text-foreground mb-2">
                كيف يعمل نظام المستويات؟
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                نظام بنية للمستويات مصمم ليكون غير خطي - يمكنك استعراض جميع المستويات واختيار
                ما يناسبك. كل مستوى يحتوي على محتوى مخصص يراعي احتياجاتك المعرفية الفريدة.
                ننصحك بالبدء بالتقييم لتحديد المستوى الأنسب لك.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
