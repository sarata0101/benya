"use client"

import { useState } from "react"
import { CheckCircle2, Circle, ArrowLeft, ArrowRight, RotateCcw, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AssessmentSectionProps {
  onComplete: (level: number) => void
}

interface Question {
  id: number
  text: string
  options: { id: string; text: string; score: number }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "البيانات التعريفية: ما هو عمرك الزمني؟",
    options: [
      { id: "a", text: "6 - 12 سنة", score: 1 },
      { id: "b", text: "13 - 18 سنة", score: 2 },
      { id: "c", text: "أكبر من 18 سنة", score: 3 },
    ],
  },
  {
    id: 2,
    text: "مقياس التخيل الذهني: إذا طلبتُ منك تخيل وردة حمراء وأنت مغمض العينين، ماذا ترى؟",
    options: [
      { id: "a", text: "لا أرى شيئاً (سواد تام)", score: 1 },
      { id: "b", text: "أرى طيفاً باهتاً جداً", score: 2 },
      { id: "c", text: "أرى صورة واضحة كأنها حقيقية", score: 3 },
    ],
  },
  {
    id: 3,
    text: "بوابة المستوى الأول: أي من هذه الفواكه لونها أصفر؟ (تفاحة حمراء، موزة صفراء، عنب أخضر)",
    options: [
      { id: "a", text: "تفاحة", score: 1 },
      { id: "b", text: "موزة", score: 3 },
      { id: "c", text: "عنب", score: 1 },
    ],
  },
  {
    id: 4,
    text: "بوابة المستوى الثاني: ادمج حروف (بـ نـ ت) لتصبح كلمة واحدة:",
    options: [
      { id: "a", text: "بنت", score: 3 },
      { id: "b", text: "بيت", score: 1 },
      { id: "c", text: "نبات", score: 1 },
    ],
  },
  {
    id: 5,
    text: "بوابة المستوى الثالث: إكمال النمط (10، 20، 30، ....؟)",
    options: [
      { id: "a", text: "35", score: 1 },
      { id: "b", text: "40", score: 3 },
      { id: "c", text: "50", score: 1 },
    ],
  },
  {
    id: 6,
    text: "بوابة المستوى الرابع: إذا اشتريتَ قطعة حلوى بـ 5 جنيهات وأعطيتَ البائع 10 جنيهات، كم يتبقى معك؟",
    options: [
      { id: "a", text: "5 جنيهات", score: 3 },
      { id: "b", text: "10 جنيهات", score: 1 },
      { id: "c", text: "لا شيء", score: 0 },
    ],
  },
  {
    id: 7,
    text: "بوابة المستوى الخامس: انكسر قلمك الوحيد أثناء الامتحان، ماذا تفعل؟",
    options: [
      { id: "a", text: "أبكي وأتوقف عن الحل", score: 1 },
      { id: "b", text: "أطلب قلماً من زميلي أو المعلم", score: 3 },
      { id: "c", text: "أنتظر حتى ينتهي الوقت", score: 1 },
    ],
  },
]

function calculateLevel(score: number): number {
  if (score >= 16) return 5
  if (score >= 13) return 4
  if (score >= 10) return 3
  if (score >= 7) return 2
  return 1
}

function getLevelInfo(level: number): { title: string; description: string; color: string } {
  const levels = {
    1: {
      title: "المستوى الأول: بِنْيَة التمييز",
      description: "انطلاقتك في المستوى الأول: بِنْيَة التمييز؛ حيث سنثبت معاً أركان التعرف البصري واللغوي.",
      color: "bg-primary",
    },
    2: {
      title: "المستوى الثاني: بِنْيَة الربط والتسلسل",
      description: "خطوتك التالية في المستوى الثاني: بِنْيَة الربط والتسلسل؛ لنبني معاً جسور الأرقام والكلمات.",
      color: "bg-primary/80",
    },
    3: {
      title: "المستوى الثالث: بِنْيَة المنطق والاستنتاج",
      description: "مكانك هو المستوى الثالث: بِنْيَة المنطق والاستنتاج؛ لنشيد معاً مهارات التفكير والقواعد.",
      color: "bg-secondary",
    },
    4: {
      title: "المستوى الرابع: بِنْيَة المعالجة والتطبيق",
      description: "أنت مستعد لـ المستوى الرابع: بِنْيَة المعالجة والتطبيق؛ لنطبق فهمك في مواقف الحياة الواقعية.",
      color: "bg-secondary/80",
    },
    5: {
      title: "المستوى الخامس: بِنْيَة التحليل والاستقلالية",
      description: "لقد وصلت لـ المستوى الخامس: بِنْيَة التحليل والاستقلالية؛ لنتوج رحلتك بالقدرة على القيادة والقرار.",
      color: "bg-accent",
    },
  }
  return levels[level as keyof typeof levels] || levels[1]
}

export function AssessmentSection({ onComplete }: AssessmentSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [resultLevel, setResultLevel] = useState(0)

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]
  const selectedAnswer = answers[question.id]

  const handleSelectAnswer = (optionId: string) => {
    setAnswers({ ...answers, [question.id]: optionId })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    const totalScore = questions.reduce((sum, q) => {
      const selectedOption = q.options.find((o) => o.id === answers[q.id])
      return sum + (selectedOption?.score || 0)
    }, 0)

    const level = calculateLevel(totalScore)
    setResultLevel(level)
    setShowResult(true)
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
    setResultLevel(0)
  }

  const handleViewLevel = () => {
    onComplete(resultLevel)
  }

  const allAnswered = Object.keys(answers).length === questions.length
  const isLastQuestion = currentQuestion === questions.length - 1

  if (showResult) {
    const levelInfo = getLevelInfo(resultLevel)
    return (
      <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20 overflow-hidden">
            <div className={`${levelInfo.color} p-6 text-center`}>
              <Award className="w-16 h-16 text-primary-foreground mx-auto mb-4" />
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-primary-foreground">
                نتيجة التقييم
              </h2>
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                  <span className="font-[var(--font-heading)] text-4xl font-bold text-primary">
                    {resultLevel}
                  </span>
                </div>
                <h3 className="font-[var(--font-heading)] text-xl font-bold text-foreground mb-2">
                  {levelInfo.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {levelInfo.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  إعادة التقييم
                </Button>
                <Button
                  onClick={handleViewLevel}
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                >
                  استعراض المستويات
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-primary mb-4">
            اختبار بوابة القياس الإدراكي - مشروع "بِنْيَة"
          </h1>
          <p className="text-muted-foreground">
            مرحباً بك في مِعمار "بِنْيَة". هذا الاختبار التشخيصي مصمم وفق معايير (DSM-5) و(Vineland) لتحديد المسار الأنسب لقدراتك الإدراكية واللغوية. أجب بكل أريحية لنبني لك منهجاً على قياسك.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>السؤال {currentQuestion + 1} من {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-[var(--font-heading)] text-xl leading-relaxed">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(option.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-right ${
                    selectedAnswer === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30 hover:bg-muted/50"
                  }`}
                  aria-pressed={selectedAnswer === option.id}
                >
                  {selectedAnswer === option.id ? (
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className="text-foreground leading-relaxed">{option.text}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            السابق
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              إرسال الإجابات
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              التالي
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}