"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, BookOpen, CheckCircle2, Compass, Star, Sparkles, Triangle, Baby, Gift, MessageCircle, HelpCircle, Leaf, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface CurriculumSectionProps {
  onBack: () => void
}

const lessons = [
  { id: 1, title: "رحلة استكشاف الأشكال الهندسية", duration: "15 دقيقة", completed: false },
  { id: 2, title: "ألوان الحياة النابضة", duration: "20 دقيقة", completed: false },
  { id: 3, title: "بِنْيَة ولعبة الأحجام العجيبة", duration: "20 دقيقة", completed: false },
  { id: 4, title: "بِنْيَة وأصدقاؤه الأليفة", duration: "20 دقيقة", completed: false },
  { id: 5, title: "بِنْيَة وحرفي السحري", duration: "20 دقيقة", completed: false },
  { id: 6, title: "مغامرة الكلمات الصديقة", duration: "20 دقيقة", completed: false },
  { id: 7, title: "بِنْيَة يسمع الكلام", duration: "20 دقيقة", completed: false },
  { id: 8, title: "بِنْيَة يتعلم الصح والخطأ", duration: "20 دقيقة", completed: false },
  { id: 9, title: "بِنْيَة وصديقتنا البيئة", duration: "20 دقيقة", completed: false },
  { id: 10, title: "بِنْيَة والصديق اللطيف", duration: "20 دقيقة", completed: false },
]

export function CurriculumSection({ onBack }: CurriculumSectionProps) {
  const [activeLesson, setActiveLesson] = useState(1)
  const [lessonStarted, setLessonStarted] = useState(false)
  
  // مرجع لتخزين الصوت الحالي - ضروري لمنع التداخل
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // دالة لإيقاف أي صوت يعمل حالياً بشكل كامل
  const stopAllSounds = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
  }

  const playSound = (fileName: string) => {
    try {
      // 1. أوقف أي صوت شغال أولاً
      stopAllSounds()

      // 2. شغل الصوت الجديد
      const audio = new Audio(`/sounds/${fileName}.mp3`)
      audioRef.current = audio
      audio.play().catch((e) => {
        console.warn("التشغيل التلقائي محظور حتى يتفاعل المستخدم مع الصفحة");
      });
    } catch (e) {}
  }

  // تأثير تشغيل صوت الترحيب وإيقافه عند مغادرة الصفحة
  useEffect(() => {
    // تشغيل الترحيب
    playSound('welcome')

    // هذا الجزء هو المسؤول عن إيقاف الصوت فور تغيير الصفحة (Cleanup)
    return () => {
      stopAllSounds()
    }
  }, []) // سيعمل فقط عند فتح صفحة "الدروس"

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFCF0]">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => {
            stopAllSounds(); // إيقاف الصوت عند العودة للمستويات
            onBack();
          }} 
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowRight className="w-4 h-4" /> العودة للمستويات
        </Button>

        {/* قائمة الدروس */}
        <div className="mb-8 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-3">
            {lessons.map((lesson, index) => (
              <Card 
                key={lesson.id} 
                className={`cursor-pointer border min-w-[220px] transition-all duration-300 ${activeLesson === lesson.id ? "border-primary bg-primary/10 scale-105" : "border-border bg-white"}`}
                onClick={() => { 
                  stopAllSounds(); // إيقاف الصوت عند التبديل بين الدروس
                  setActiveLesson(lesson.id); 
                  setLessonStarted(false); 
                }}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="font-medium text-xs truncate text-foreground">{lesson.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-sm min-h-[500px]">
          
          {/* الدرس 1 */}
          {activeLesson === 1 && (
            <div className="prose prose-lg max-w-none">
              {!lessonStarted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="inline-block mb-6">
                    <Compass className="w-24 h-24 text-[#10b981]" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-foreground">مرحباً بك يا مستكشف بِنْيَة الشجاع!</h2>
                  <p className="text-muted-foreground mb-8 text-lg">هل أنتَ جاهزٌ لتنطلق في رحلة الأشكال؟</p>
                  <Button 
                    size="lg" 
                    className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-10" 
                    onClick={() => {
                        stopAllSounds(); // إيقاف صوت الترحيب (Welcome) فوراً عند بدء الدرس
                        setLessonStarted(true);
                    }}
                  >
                    اضغط على البوصلة لنبدأ!
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <h2 className="font-bold text-xl m-0">الدرس الأول: رحلة استكشاف الأشكال</h2>
                  </div>
                  <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-[#10b981]/5 rounded-2xl p-6 border-2 border-[#10b981]/20 flex flex-col items-center">
                    <motion.div whileHover={{ rotate: 180 }} className="w-24 h-24 rounded-full border-4 border-[#10b981] mb-4 bg-white flex items-center justify-center cursor-pointer shadow-sm" onClick={() => playSound('circle')}>
                       <Sparkles className="text-yellow-400 w-8 h-8" />
                    </motion.div>
                    <h3 className="text-[#10b981] font-bold">محطة الدائرة</h3>
                    <p className="text-center text-gray-700 m-0">انظر! إنها (الدائرة). ناعمة ومستديرة تماماً مثل الشمس.</p>
                  </motion.div>
                  <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#800020]/5 rounded-2xl p-6 border-2 border-[#800020]/20 flex flex-col items-center">
                    <motion.div whileTap={{ scale: 0.9 }} className="w-24 h-24 border-4 border-[#800020] mb-4 bg-white flex items-center justify-center cursor-pointer shadow-sm" onClick={() => playSound('square')}>
                       <span className="font-bold text-[#800020] text-2xl">4</span>
                    </motion.div>
                    <h3 className="text-[#800020] font-bold">محطة المربع</h3>
                    <p className="text-center text-gray-700 m-0">وهذا هو (المربع). إنه قوي وثابت!</p>
                  </motion.div>
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 flex flex-col items-center">
                    <motion.div whileHover={{ scale: 1.1 }} className="w-24 h-24 mb-4 flex items-center justify-center cursor-pointer" onClick={() => playSound('triangle')}>
                       <Triangle className="w-20 h-20 text-blue-600 fill-blue-100 stroke-[3]" />
                    </motion.div>
                    <h3 className="text-blue-600 font-bold">محطة المثلث</h3>
                    <p className="text-center text-gray-700 m-0">وأخيراً (المثلث)! له ثلاث زوايا حادة.</p>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {/* الدرس 2 */}
          {activeLesson === 2 && (
            <div className="prose prose-lg max-w-none">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="font-bold text-xl m-0">الدرس الثاني: ألوان الحياة النابضة</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200 text-center cursor-pointer shadow-sm hover:shadow-md transition-shadow" onClick={() => playSound('red')}>
                  <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-3" />
                  <h3 className="text-red-600 font-bold">اللون الأحمر</h3>
                  <p className="m-0">مثل الفراولة اللذيذة والوردة الجميلة.</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-200 text-center cursor-pointer shadow-sm hover:shadow-md transition-shadow" onClick={() => playSound('yellow')}>
                  <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-3" />
                  <h3 className="text-yellow-600 font-bold">اللون الأصفر</h3>
                  <p className="m-0">مثل الشمس الساطعة والموز المغذي.</p>
                </div>
              </div>
            </div>
          )}

          {/* الدرس 3 */}
          {activeLesson === 3 && (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl font-bold mb-6 text-orange-600 flex items-center gap-2"><Star/> بِنْيَة ولعبة الأحجام العجيبة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-200 text-center cursor-pointer shadow-sm" onClick={() => playSound('big')}>
                  <span className="text-6xl block mb-2">🐘</span>
                  <p className="font-bold m-0">كبير (فيل ضخم)</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-200 text-center cursor-pointer shadow-sm" onClick={() => playSound('small')}>
                  <span className="text-2xl block mb-2">🐭</span>
                  <p className="font-bold m-0">صغير (فأر لطيف)</p>
                </motion.div>
              </div>
            </div>
          )}

          {/* الدرس 4 */}
          {activeLesson === 4 && (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl font-bold mb-6">بِنْيَة وأصدقاؤه الأليفة</h2>
              <div className="space-y-4">
                <Card className="hover:border-primary cursor-pointer transition-all" onClick={() => playSound('cat')}>
                  <CardContent className="p-6 flex items-center gap-6">
                    <span className="text-5xl">🐱</span>
                    <div><h4 className="font-bold text-lg m-0">القطة تقول: مياو</h4></div>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary cursor-pointer transition-all" onClick={() => playSound('dog')}>
                  <CardContent className="p-6 flex items-center gap-6">
                    <span className="text-5xl">🐶</span>
                    <div><h4 className="font-bold text-lg m-0">الكلب يقول: هو هو</h4></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* الدرس 5 */}
          {activeLesson === 5 && (
            <div className="prose prose-lg max-w-none text-center">
              <h2 className="text-xl font-bold mb-6">بِنْيَة وحرفي السحري</h2>
              <div className="p-12 bg-purple-50 rounded-[40px] border-4 border-dashed border-purple-200">
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity }} className="text-8xl mb-6">🎁</motion.div>
                <p className="text-purple-700 font-bold mb-4">ما هي المفاجأة داخل الصندوق؟</p>
                <Button className="bg-purple-600 rounded-full px-10 shadow-lg" onClick={() => playSound('alphabet')}>افتح الصندوق 🎊</Button>
              </div>
            </div>
          )}

          {/* الدرس 6 */}
          {activeLesson === 6 && (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl font-bold mb-6 text-indigo-600">مغامرة الكلمات الصديقة</h2>
              <div className="p-8 bg-indigo-50 rounded-2xl text-center border-2 border-indigo-100">
                <p className="text-5xl font-black text-indigo-800 tracking-widest mb-6">بـ + ا + ب</p>
                <Button size="lg" className="bg-indigo-600 w-full" onClick={() => playSound('words')}>اسمع نطق الكلمة</Button>
              </div>
            </div>
          )}

          {/* الدرس 7 */}
          {activeLesson === 7 && (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl font-bold mb-6">بِنْيَة يسمع الكلام</h2>
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" className="h-32 text-xl font-bold border-2 hover:bg-green-50 shadow-sm" onClick={() => playSound('stand')}>قِف 🧍</Button>
                <Button variant="outline" className="h-32 text-xl font-bold border-2 hover:bg-blue-50 shadow-sm" onClick={() => playSound('sit')}>اجلس 🪑</Button>
              </div>
            </div>
          )}

          {/* الدرس 8 */}
          {activeLesson === 8 && (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><CheckCircle2 className="text-emerald-500"/> بِنْيَة يتعلم الصح والخطأ</h2>
              <div className="space-y-4">
                <div className="p-5 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-between shadow-sm">
                  <span className="font-bold">أقول الصدق دائماً</span>
                  <Button className="bg-emerald-500" onClick={() => playSound('correct')}>صح ✅</Button>
                </div>
                <div className="p-5 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-between shadow-sm">
                  <span className="font-bold">أرفع صوتي على الكبار</span>
                  <Button className="bg-red-500" onClick={() => playSound('wrong')}>خطأ ❌</Button>
                </div>
              </div>
            </div>
          )}

          {/* الدرس 9 */}
          {activeLesson === 9 && (
            <div className="prose prose-lg max-w-none text-center">
              <h2 className="text-xl font-bold mb-6 text-emerald-700">بِنْيَة وصديقتنا البيئة</h2>
              <div className="bg-emerald-50 p-10 rounded-3xl border-2 border-emerald-100">
                <motion.div whileTap={{ scale: 1.3 }} className="text-9xl cursor-pointer mb-6" onClick={() => playSound('plant')}>🌱</motion.div>
                <p className="font-bold text-emerald-800">اضغط على الزرعة لتسقيها</p>
              </div>
            </div>
          )}

          {/* الدرس 10 */}
          {activeLesson === 10 && (
            <div className="prose prose-lg max-w-none text-center">
              <h2 className="text-2xl font-bold mb-8 flex items-center justify-center gap-2 text-red-500"><Heart className="fill-red-500"/> بِنْيَة والصديق اللطيف</h2>
              <div className="p-10 bg-gradient-to-b from-red-50 to-white rounded-full inline-block border-4 border-red-100 shadow-xl mb-6">
                <Baby className="w-24 h-24 text-red-400"/>
              </div>
              <p className="text-xl font-bold text-gray-800 mb-8">مبروك! لقد أتممت جميع الدروس بنجاح!</p>
              <Button size="lg" className="bg-red-500 hover:bg-red-600 px-12 py-6 text-xl rounded-full shadow-lg" onClick={() => playSound('finish')}>احتفال النهاية 🎉</Button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}