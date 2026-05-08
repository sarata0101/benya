"use client"

import { Blocks, Brain, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onStartAssessment: () => void
}

export function HeroSection({ onStartAssessment }: HeroSectionProps) {
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-16">
          {/* Building Blocks Visual */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="flex gap-2 items-end">
                <div className="w-12 h-12 bg-primary rounded-lg animate-pulse" style={{ animationDelay: "0ms" }} />
                <div className="w-12 h-16 bg-secondary rounded-lg animate-pulse" style={{ animationDelay: "200ms" }} />
                <div className="w-12 h-20 bg-primary/80 rounded-lg animate-pulse" style={{ animationDelay: "400ms" }} />
                <div className="w-12 h-14 bg-secondary/80 rounded-lg animate-pulse" style={{ animationDelay: "600ms" }} />
                <div className="w-12 h-18 bg-primary/60 rounded-lg animate-pulse" style={{ animationDelay: "800ms" }} />
              </div>
            </div>
          </div>

          {/* Slogan */}
            <h1 className="mb-6 text-balance leading-tight">
              {/* اسم المشروع بالخط الأساسي (Wicklow) وفي سطر لوحده */}
              <span className="block font-['WicklowArabic'] text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-2">
                بـــــــــنية..
              </span>
              
              {/* بقية الجملة بالخط الفرعي (Kufyan) وتحتها */}
              <span className="block font-['KufyanArabic'] text-[15px] sm:text-[18px] md:text-2xl lg:text-3xl font-medium text-primary/80 tracking-normal whitespace-nowrap">
  نـــبني الفهمَ على قيـــــاسِك
</span>
            </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed text-pretty">
            منصة تكيفية معرفية مصممة لدعم الأفراد الذين يواجهون تحديات في التخيل الذهني (الأفانتازيا) 
            والوظائف التنفيذية. نقدم تقييماً شاملاً ومحتوى تعليمياً مخصصاً لكل مستوى.
          </p>

          <Button
            size="lg"
            onClick={onStartAssessment}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            ابدأ التقييم الآن
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
  {/* هنحط كل كارد جوه div ونديله class الخط */}
  <div className="[&_h3]:font-['KufyanArabic']">
    <FeatureCard
      icon={Brain}
      title="تقييم معرفي شامل"
      description="اختبارات مصممة بعناية لفهم نمطك المعرفي الفريد وتحديد نقاط القوة والتحديات."
    />
  </div>

  <div className="[&_h3]:font-['KufyanArabic']">
    <FeatureCard
      icon={Target}
      title="محتوى مخصص"
      description="مناهج تعليمية مصممة خصيصاً لمستواك، تراعي احتياجاتك وتدعم تطورك."
    />
  </div>

  <div className="[&_h3]:font-['KufyanArabic']">
    <FeatureCard
      icon={Users}
      title="دعم مستمر"
      description="مجتمع داعم وموارد تعليمية متجددة لمساعدتك في رحلة التعلم."
    />
  </div>
</div>



        {/* Mission Statement */}
        <div className="mt-20 bg-card rounded-2xl p-8 sm:p-12 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Blocks className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground mb-4">
                رسالتنا
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                نؤمن بأن كل فرد يتعلم بطريقته الخاصة. بنية منصة تهدف إلى تقديم تجربة تعليمية 
                مخصصة تراعي الفروق الفردية في القدرات المعرفية، خاصة لمن يواجهون تحديات 
                في التخيل البصري أو الوظائف التنفيذية. نبني معاً جسراً نحو فهم أعمق وتعلم أسهل.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Brain
  title: string
  description: string
}) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors group">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-[var(--font-heading)] text-xl font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
