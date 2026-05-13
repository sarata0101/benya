"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, BookOpen, CheckCircle2, Compass, Star, Sparkles, Triangle, Baby, Gift, MessageCircle, HelpCircle, Leaf, Heart, Link2, Apple, MousePointer2, Trophy, DoorOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"

interface CurriculumSectionProps {
  onBack: () => void
  levelId: number;
}

const levelsData: Record<number, any[]> = {
  1: [
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
  ],
  2: [
    { id: 1, title: "لعبة الربط", duration: "15 دقيقة", completed: false },
    
  ],
  3: [
    { id: 1, title: "صانع الجمال", duration: "15 دقيقة", completed: false },
    
  ],
  4: [
    { id: 1, title: "مهمة القائد", duration: "15 دقيقة", completed: false },
    
  ],
  5: [
    { id: 1, title: "مهمة المعلم الصغير", duration: "15 دقيقة", completed: false },
    
  ],
}



// تحديث الدرس النشط عند تغيير المستوى
export function CurriculumSection({ onBack, levelId }: CurriculumSectionProps) {
  // 2. جلب دروس المستوى الحالي
  const currentLevelLessons = levelsData[levelId] || [];
  
  // 3. تعريف الـ State (تأكد من عدم التكرار)
  const [activeLesson, setActiveLesson] = useState<number>(currentLevelLessons[0]?.id || 0);
  const [lessonStarted, setLessonStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [feedback1, setFeedback1] = useState<string | null>(null);
  const [feedback2, setFeedback2] = useState<string | null>(null);
  const [feedback3, setFeedback3] = useState<string | null>(null);
  const [feedback4, setFeedback4] = useState<string | null>(null);
  

  // 4. تحديث الدرس عند تغيير المستوى
  useEffect(() => {
    if (currentLevelLessons.length > 0) {
      setActiveLesson(currentLevelLessons[0].id);
      setLessonStarted(false);
      stopAllSounds();
      playSound('welcome');
    }
    return () => stopAllSounds();
  }, [levelId]);

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
            {currentLevelLessons.map((lesson, index) => (
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
          
        <div className="level 1">
        {/* ================= المستوي الأول ================= */}
          {levelId === 1 && (
            <>
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
        </>
        )}
      </div>

              <div className="level 2">
        {/* ================= المستوي الثاني ================= */}
          {levelId === 2 && (
            <>
          {/* الدرس 1 */}
{activeLesson === 1 && (
  <div className="prose prose-lg max-w-none">
    {!lessonStarted ? (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-[#8B4513]/5 rounded-3xl">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="inline-block mb-6">
          <Compass className="w-24 h-24 text-[#10b981]" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground">مرحباً بك في المستوى الثاني!</h2>
        <p className="text-muted-foreground mb-8 text-lg">هل تستطيع تخمين الكلمة الصحيحة؟ اضغط لنبدأ!</p>
        <Button 
          size="lg" 
          className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-10" 
          onClick={() => {
              stopAllSounds();
              setLessonStarted(true);
          }}
        >
          بوابة بِنْيَة السحرية
        </Button>
      </motion.div>
    ) : (
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Link2 className="w-6 h-6 text-primary" />
          <h2 className="font-bold text-xl m-0">الدرس الأول: الانطلاق (لعبة الربط)</h2>
        </div>

        {/* محطة قطة */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className="text-6xl mb-4 bg-[#FFB347]/10 w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-[#FFB347]/20">
              🐱
          </div>
          <h3 className="text-[#10b981] font-bold">محطة الأولى</h3>
          <p className="text-center text-gray-700 m-0 mb-4">"انقر على الكلمة التي تصف الصورة"</p>
          
          <div className="flex gap-4">
             <button 
                onClick={() => { playSound('meow'); setFeedback1('correct'); }}
                className={`px-8 py-2 border-2 rounded-full font-bold transition-all ${feedback1 === 'correct' ? 'bg-green-500 text-white border-green-500' : 'bg-white border-green-200 text-green-700 hover:bg-green-50'}`}
             >
                قطة
             </button>
             <button 
                onClick={() => setFeedback1('wrong')}
                className={`px-8 py-2 border-2 rounded-full font-bold transition-all ${feedback1 === 'wrong' ? 'bg-red-500 text-white border-red-500' : 'bg-white border-red-200 text-red-700 hover:bg-red-50'}`}
             >
                كلب
             </button>
          </div>
          {feedback1 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-green-600 font-bold">أحسنتِ! هذه قطة جميلة 🐾</motion.p>}
          {feedback1 === 'wrong' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-red-600 font-bold">للأسف إجابة خاطئة، هذه "قطة".</motion.p>}
        </motion.div>

        {/* محطة تفاحة */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className="text-6xl mb-4 bg-red-50 w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-red-100">
              🍎
          </div>
          <h3 className="text-[#800020] font-bold">محطة الثانية</h3>
          <p className="text-center text-gray-700 m-0 mb-4">"أين اسم هذه الفاكهة؟"</p>
          
          <div className="flex gap-4">
             <button 
                onClick={() => setFeedback2('wrong')}
                className={`px-8 py-2 border-2 rounded-full font-bold transition-all ${feedback2 === 'wrong' ? 'bg-red-500 text-white border-red-500' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
             >
                موز
             </button>
             <button 
                onClick={() => { playSound('crunch'); setFeedback2('correct'); }}
                className={`px-8 py-2 border-2 rounded-full font-bold transition-all ${feedback2 === 'correct' ? 'bg-red-500 text-white border-red-500' : 'bg-white border-red-200 text-red-700 hover:bg-red-50'}`}
             >
                تفاحة
             </button>
          </div>
          {feedback2 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-green-600 font-bold">ممتاز! تفاحة حمراء لذيذة 🍎</motion.p>}
          {feedback2 === 'wrong' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-red-600 font-bold">حاولي ثانية، هذه "تفاحة".</motion.p>}
        </motion.div>

        {/* محطة فأر */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className="text-6xl mb-4 bg-gray-50 w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-gray-200">
              🐭
          </div>
          <h3 className="text-blue-600 font-bold">المحطة الثالثة</h3>
          <p className="text-center text-gray-700 m-0 mb-4">"ساعد الصديق الصغير ليعرف اسمه"</p>
          
          <div className="flex gap-4">
             <button 
                onClick={() => setFeedback3('wrong')}
                className={`px-8 py-2 border-2 rounded-full font-bold transition-all ${feedback3 === 'wrong' ? 'bg-red-500 text-white border-red-500' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
             >
                فيل
             </button>
             <button 
                onClick={() => { playSound('charm'); setFeedback3('correct'); }}
                className={`px-8 py-2 border-2 rounded-full font-bold transition-all ${feedback3 === 'correct' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50'}`}
             >
                فأر
             </button>
          </div>
          {feedback3 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-green-600 font-bold">إجابة صحيحة! أنا الفأر بِنْيَة 🐭</motion.p>}
          {feedback3 === 'wrong' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-red-600 font-bold">خطأ بسيط، هذا هو الصديق "فأر".</motion.p>}
        </motion.div>

        {/* شاشة الاحتفال */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-[#8B4513]/10 rounded-3xl p-8 border-dashed border-4 border-[#8B4513]/30 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-red-600 font-bold text-3xl mb-2">مُمتَاز!</h2>
            <p className="text-[#8B4513] font-bold">لقد حصلتِ على (وسام الربط الذكي)</p>
        </motion.div>
      </div>
    )}
  </div>
)}

          
        </>
        )}
      </div>

              <div className="level 3">
        {/* ================= المستوي الثالث ================= */}
          {levelId === 3 && (
            <>
          {/* الدرس 1 - المستوى الثالث */}
{activeLesson === 1 && (
  <div className="prose prose-lg max-w-none">
    {!lessonStarted ? (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-[#8B4513]/5 rounded-3xl">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-6">
          <div className="text-7xl">📜</div> {/* بِنْيَة يمسك لوحة خشبية */}
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground">يا بطل! هيا نجمع الكلمات لنصنع جملة.</h2>
        <p className="text-muted-foreground mb-8 text-lg">هل أنتَ مستعدٌ لتصبح مؤلفاً صغيراً؟</p>
        <Button 
          size="lg" 
          className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-10" 
          onClick={() => {
              stopAllSounds();
              setLessonStarted(true);
          }}
        >
          اضغط لنبدأ!
        </Button>
      </motion.div>
    ) : (
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <PenTool className="w-6 h-6 text-primary" />
          <h2 className="font-bold text-xl m-0">صانع الجمل</h2>
        </div>

        {/* محطة تكوين جملة: بِنْيَة يحب */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className="text-6xl mb-4 bg-green-50 w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-green-100">
              🐭🍎
          </div>
          <h3 className="text-[#10b981] font-bold">المحطة الأولى</h3>
          <p className="text-center text-gray-700 m-0 mb-4 font-medium">"رتب الكلمات لتصف الصورة"</p>
          
          <div className="flex gap-4">
             <button 
                onClick={() => setFeedback1('step1')}
                className={`px-6 py-2 border-2 rounded-xl font-bold transition-all ${feedback1 === 'step1' || feedback1 === 'correct' ? 'bg-green-500 text-white border-green-500' : 'bg-white border-gray-200'}`}
             >
                بِنْيَة
             </button>
             <button 
                onClick={() => {
                  if(feedback1 === 'step1') { setFeedback1('correct'); playSound('heart'); }
                  else { setFeedback1('wrong'); }
                }}
                className={`px-6 py-2 border-2 rounded-xl font-bold transition-all ${feedback1 === 'correct' ? 'bg-green-500 text-white border-green-500' : 'bg-white border-gray-200'}`}
             >
                يُحب
             </button>
          </div>
          {feedback1 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-green-600 font-bold">أحسنت! "بِنْيَة يُحب التفاح" 💚</motion.p>}
          {feedback1 === 'wrong' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-red-600 font-bold">ابدأ باسم الصديق أولاً: "بِنْيَة".</motion.p>}
        </motion.div>

        {/* محطة تكوين جملة: القطة تشرب */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className="text-6xl mb-4 bg-blue-50 w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-blue-100">
              🐱🥛
          </div>
          <h3 className="text-[#800020] font-bold">المحطة الثانية</h3>
          <p className="text-center text-gray-700 m-0 mb-4 font-medium">"ماذا تفعل القطة؟ رتب الجملة"</p>
          
          <div className="flex gap-4">
             <button 
                onClick={() => setFeedback2('step1')}
                className={`px-6 py-2 border-2 rounded-xl font-bold transition-all ${feedback2 === 'step1' || feedback2 === 'correct' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-200'}`}
             >
                القطة
             </button>
             <button 
                onClick={() => {
                  if(feedback2 === 'step1') { setFeedback2('correct'); playSound('splash'); }
                  else { setFeedback2('wrong'); }
                }}
                className={`px-6 py-2 border-2 rounded-xl font-bold transition-all ${feedback2 === 'correct' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-200'}`}
             >
                تشرب
             </button>
          </div>
          {feedback2 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-blue-600 font-bold">رائع! "القطة تشرب اللبن" 🥛</motion.p>}
          {feedback2 === 'wrong' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-red-600 font-bold">حاول ثانية، ابدأ بكلمة "القطة".</motion.p>}
        </motion.div>

        {/* محطة تكوين جملة: الولد يلعب */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className="text-6xl mb-4 bg-orange-50 w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-orange-100">
              👦⚽
          </div>
          <h3 className="text-orange-600 font-bold">المحطة الثالثة</h3>
          <p className="text-center text-gray-700 m-0 mb-4 font-medium">"اصنع جملة تلعب بها"</p>
          
          <div className="flex gap-4">
             <button 
                onClick={() => setFeedback3('step1')}
                className={`px-6 py-2 border-2 rounded-xl font-bold transition-all ${feedback3 === 'step1' || feedback3 === 'correct' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border-gray-200'}`}
             >
                الولد
             </button>
             <button 
                onClick={() => {
                  if(feedback3 === 'step1') { setFeedback3('correct'); playSound('laugh'); }
                  else { setFeedback3('wrong'); }
                }}
                className={`px-6 py-2 border-2 rounded-xl font-bold transition-all ${feedback3 === 'correct' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border-gray-200'}`}
             >
                يلعب
             </button>
          </div>
          {feedback3 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-orange-600 font-bold">ممتاز! "الولد يلعب بالكرة" ⚽</motion.p>}
          {feedback3 === 'wrong' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-red-600 font-bold">خطأ، ابدأ بكلمة "الولد".</motion.p>}
        </motion.div>

        {/* شاشة الاحتفال */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#F5F5DC] rounded-3xl p-8 border-dashed border-4 border-green-200 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none flex justify-around items-start opacity-30">
                <span className="text-2xl animate-bounce">🍃</span>
                <span className="text-2xl animate-bounce delay-75">🍂</span>
                <span className="text-2xl animate-bounce delay-150">🌿</span>
            </div>
            <div className="text-6xl mb-4">✨🕺✨</div>
            <h2 className="text-green-600 font-bold text-3xl mb-2">مُبارك أيها المؤلف!</h2>
            <p className="text-[#8B4513] font-bold">لقد حصلتَ على (وسام المؤلف الصغير) 🍃</p>
        </motion.div>
      </div>
    )}
  </div>
)}

          
        </>
        )}
      </div>

              <div className="level 4">
        {/* ================= المستوي الرابع ================= */}
          {levelId === 4 && (
            <>
          {/* الدرس 1 - المستوى الرابع */}
{activeLesson === 1 && (
  <div className="prose prose-lg max-w-none">
    {!lessonStarted ? (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-[#8B4513]/5 rounded-3xl">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-6">
          <div className="text-7xl">🗺️</div> {/* بِنْيَة يحمل خريطة */}
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground">أهلاً بالقائد! بِنْيَة يحتاج ذكاءك ليحل المشكلات.</h2>
        <p className="text-muted-foreground mb-8 text-lg">هل أنتَ جاهزٌ لتولي القيادة؟</p>
        <Button 
          size="lg" 
          className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-10" 
          onClick={() => {
              stopAllSounds();
              setLessonStarted(true);
          }}
        >
          اضغط لننطلق!
        </Button>
      </motion.div>
    ) : (
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🎖️</span>
          <h2 className="font-bold text-xl m-0">الدرس الأول: الانطلاق (مهمة القائد)</h2>
        </div>

        {/* محطة حل المشكلة - المطر */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className="text-6xl mb-4 bg-blue-50 w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-blue-100 relative">
              <span className={feedback1 === 'correct' ? '' : 'animate-bounce'}>🐭</span>
              {feedback1 !== 'correct' && <span className="absolute top-2 text-2xl">🌧️</span>}
              {feedback1 === 'correct' && <span className="absolute -top-2 text-4xl text-green-500">⛱️</span>}
          </div>
          <h3 className="text-[#10b981] font-bold">المحطة الأولى</h3>
          <p className="text-center text-gray-700 m-0 mb-4 font-medium">"الدنيا تمطر! ماذا يحتاج بِنْيَة؟"</p>
          
          <div className="flex gap-4">
             <button 
                onClick={() => { setFeedback1('correct'); playSound('rain-stop'); }}
                className={`px-8 py-2 border-2 rounded-xl font-bold transition-all ${feedback1 === 'correct' ? 'bg-green-500 text-white' : 'bg-white border-green-200 text-green-700'}`}
             >
                شمسية خضراء ☂️
             </button>
             <button 
                onClick={() => setFeedback1('wrong')}
                className={`px-8 py-2 border-2 rounded-xl font-bold transition-all ${feedback1 === 'wrong' ? 'bg-red-500 text-white' : 'bg-white border-gray-200 text-gray-400'}`}
             >
                كتاب 📖
             </button>
          </div>
          {feedback1 === 'correct' && <motion.p initial={{ y: 10 }} animate={{ y: 0 }} className="mt-4 text-green-600 font-bold">رائع! لقد توقف المطر بفضلك 🎵</motion.p>}
          {feedback1 === 'wrong' && <motion.p initial={{ y: 10 }} animate={{ y: 0 }} className="mt-4 text-red-600 font-bold">الكتاب سيبتل! بِنْيَة يحتاج المظلة.</motion.p>}
        </motion.div>

        {/* محطة ترتيب المنطق - النوم */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className={`text-6xl mb-4 w-32 h-32 flex items-center justify-center rounded-2xl border-2 transition-colors duration-1000 ${feedback2 === 'correct' ? 'bg-red-900/20 border-red-900/30' : 'bg-yellow-50 border-yellow-100'}`}>
              {feedback2 === 'correct' ? '🌙💤' : '🛌☀️'}
          </div>
          <h3 className="text-[#800020] font-bold">المحطة الثانية</h3>
          <p className="text-center text-gray-700 m-0 mb-4 font-medium">"اختر الوقت المناسب للنوم"</p>
          
          <div className="flex gap-4">
             <button 
                onClick={() => setFeedback2('wrong')}
                className={`px-8 py-2 border-2 rounded-xl font-bold transition-all ${feedback2 === 'wrong' ? 'bg-orange-500 text-white' : 'bg-white border-gray-200 text-gray-400'}`}
             >
                صباحاً ☀️
             </button>
             <button 
                onClick={() => { setFeedback2('correct'); playSound('stars'); }}
                className={`px-8 py-2 border-2 rounded-xl font-bold transition-all ${feedback2 === 'correct' ? 'bg-[#800020] text-white' : 'bg-white border-red-200 text-[#800020]'}`}
             >
                ليلاً 🌙
             </button>
          </div>
          {feedback2 === 'correct' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-[#800020] font-bold">ليلاً.. أحلام سعيدة لـ بِنْيَة ✨</motion.p>}
          {feedback2 === 'wrong' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-orange-600 font-bold">الصباح للعب والنشاط، نحن ننام ليلاً.</motion.p>}
        </motion.div>

        {/* محطة تصنيف الأشياء - الفوضى */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
                  <span className="block text-4xl mb-1">📦</span>
                  <span className="text-xs font-bold text-gray-500">صندوق الفواكه</span>
              </div>
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
                  <span className="block text-4xl mb-1">🧸</span>
                  <span className="text-xs font-bold text-gray-500">صندوق الألعاب</span>
              </div>
          </div>
          <h3 className="text-blue-600 font-bold">المحطة الثالثة</h3>
          <p className="text-center text-gray-700 m-0 mb-4 font-medium">"أين نضع السيارة والموزة؟"</p>
          
          <div className="flex flex-col gap-3 w-full max-w-xs">
             <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                <span className="text-2xl">🍌</span>
                <div className="flex gap-2">
                    <button onClick={() => {setFeedback3('correct-1'); playSound('click');}} className={`p-1 px-3 rounded-md text-xs font-bold ${feedback3?.includes('correct-1') ? 'bg-green-500 text-white' : 'bg-white border'}`}>فواكه</button>
                    <button onClick={() => setFeedback3('wrong-1')} className="p-1 px-3 rounded-md text-xs border bg-white">ألعاب</button>
                </div>
             </div>
             <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                <span className="text-2xl">🚗</span>
                <div className="flex gap-2">
                    <button onClick={() => setFeedback3('wrong-2')} className="p-1 px-3 rounded-md text-xs border bg-white">فواكه</button>
                    <button onClick={() => {setFeedback3('correct-2'); playSound('click');}} className={`p-1 px-3 rounded-md text-xs font-bold ${feedback3?.includes('correct-2') ? 'bg-blue-500 text-white' : 'bg-white border'}`}>ألعاب</button>
                </div>
             </div>
          </div>
          {feedback3?.includes('correct') && <motion.p initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="mt-4 text-green-600 font-bold">أحسنت! بِنْيَة يقفز فرحاً بالنظام 🐭✨</motion.p>}
        </motion.div>

        {/* شاشة الاحتفال */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-[#8B4513]/10 rounded-3xl p-8 border-dashed border-4 border-[#10b981]/30 text-center relative overflow-hidden">
            <div className="text-6xl mb-4">🚩🐭💚</div>
            <h2 className="text-[#10b981] font-bold text-3xl mb-2">أنت رائع!</h2>
            <p className="text-[#8B4513] font-bold">لقد حصلتَ على (وسام القائد الذكي)</p>
            <div className="mt-4 flex justify-center">
                <span className="bg-[#10b981] text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">راية القيادة</span>
            </div>
        </motion.div>
      </div>
    )}
  </div>
)}
        </>
        )}
      </div>
      <div className="level 5">
        {/* ================= المستوي الخامس  ================= */}
          {levelId === 5 && (
            <>
          {/* الدرس 1 - المستوى الخامس - تنسيق عرضي (Horizontal) */}
{activeLesson === 1 && (
  <div className="prose prose-lg max-w-none px-4">
    {!lessonStarted ? (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-[#8B4513]/5 rounded-3xl border-2 border-[#8B4513]/10 my-8">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-10">
          <div className="text-8xl">🎓⌚</div>
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground mb-4">أهلاً يا معلمي الصغير!</h2>
        <Button 
          size="lg" 
          className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-12 py-6 text-xl shadow-xl" 
          onClick={() => {
              stopAllSounds();
              setLessonStarted(true);
          }}
        >
          اضغط لنبدأ المهمة!
        </Button>
      </motion.div>
    ) : (
      <div className="space-y-10 py-6">
        <div className="flex items-center gap-4 mb-6 border-b-2 border-[#8B4513]/10 pb-4">
          <span className="text-4xl">🌟</span>
          <h2 className="font-bold text-2xl m-0 text-[#8B4513]">مهمة المعلم الصغير</h2>
        </div>

        {/* محطة الاعتذار - عرضي */}
        <motion.div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-md flex flex-col md:flex-row items-center gap-10">
          {/* الجانب الأيسر: الصورة */}
          <div className="text-8xl bg-gray-50 w-48 h-48 flex items-center justify-center rounded-2xl border-4 border-gray-100 flex-shrink-0 shadow-inner">
              {feedback1 === 'correct' ? '🤝💚' : '🐭🧊💥'} 
          </div>
          
          {/* الجانب الأيمن: المحتوى */}
          <div className="flex-1 text-right space-y-6">
            <div>
              <h3 className="text-[#10b981] font-bold text-2xl mb-2">المحطة الأولى: الاعتذار</h3>
              <p className="text-gray-700 text-lg m-0 italic">"بِنْيَة أوقع مكعبات صديقه بالخطأ.. ماذا يقول؟"</p>
            </div>
            
            <div className="flex gap-4 justify-start">
               <button onClick={() => { setFeedback1('correct'); playSound('hearts'); }}
                  className={`px-8 py-3 border-2 rounded-2xl font-bold text-lg transition-all ${feedback1 === 'correct' ? 'bg-green-500 text-white scale-105' : 'bg-white border-green-200 text-green-700 hover:bg-green-50'}`}>
                  آسف
               </button>
               <button onClick={() => setFeedback1('wrong')}
                  className={`px-8 py-3 border-2 rounded-2xl font-bold text-lg transition-all ${feedback1 === 'wrong' ? 'bg-red-500 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                  لا يهمني
               </button>
            </div>
            {feedback1 && (
              <p className={`font-bold text-lg ${feedback1 === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback1 === 'correct' ? 'أحسنت! الاعتذار صفة الأبطال 🟢' : 'بِنْيَة لطيف ويجب أن يعتذر.'}
              </p>
            )}
          </div>
        </motion.div>

        {/* محطة المشاركة - عرضي */}
        <motion.div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-md flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="text-8xl bg-blue-50 w-48 h-48 flex items-center justify-center rounded-2xl border-4 border-blue-100 flex-shrink-0">
              {feedback2 === 'correct' ? '🎈🎈' : '🐭😢'}
          </div>
          
          <div className="flex-1 text-right space-y-6">
            <div>
              <h3 className="text-[#800020] font-bold text-2xl mb-2">المحطة الثانية: المشاركة</h3>
              <p className="text-gray-700 text-lg m-0 italic">"كيف نجعل الجميع سعداء؟"</p>
            </div>
            
            <div className="flex gap-4">
               <button onClick={() => { setFeedback2('correct'); playSound('laugh'); }}
                  className={`px-8 py-3 border-2 rounded-2xl font-bold text-lg transition-all ${feedback2 === 'correct' ? 'bg-blue-600 text-white scale-105' : 'bg-white border-blue-200 text-blue-700'}`}>
                  نلعب معاً
               </button>
               <button onClick={() => setFeedback2('wrong')}
                  className={`px-8 py-3 border-2 rounded-2xl font-bold text-lg transition-all ${feedback2 === 'wrong' ? 'bg-red-500 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                  ألعب وحدي
               </button>
            </div>
            {feedback2 === 'correct' && <p className="text-blue-600 font-bold text-lg">اللعب مع الأصدقاء أجمل بكثير 🎈</p>}
          </div>
        </motion.div>

        {/* محطة إدارة الوقت - عرضي */}
        <motion.div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-md flex flex-col md:flex-row items-center gap-10">
          <div className="text-8xl bg-yellow-50 w-48 h-48 flex items-center justify-center rounded-2xl border-4 border-yellow-100 flex-shrink-0">
              ☀️📖
          </div>
          
          <div className="flex-1 text-right space-y-6">
            <div>
              <h3 className="text-orange-600 font-bold text-2xl mb-2">المحطة الثالثة: النظام</h3>
              <p className="text-gray-700 text-lg m-0 italic">"الشمس أشرقت.. ماذا يفعل بِنْيَة الآن؟"</p>
            </div>
            
            <div className="flex gap-4">
               <button onClick={() => { setFeedback3('correct'); playSound('birds'); }}
                  className={`px-8 py-3 border-2 rounded-2xl font-bold text-lg transition-all ${feedback3 === 'correct' ? 'bg-orange-500 text-white scale-105' : 'bg-white border-orange-200 text-orange-700'}`}>
                  يقرأ كتاباً 📖
               </button>
               <button onClick={() => setFeedback3('wrong')}
                  className={`px-8 py-3 border-2 rounded-2xl font-bold text-lg transition-all ${feedback3 === 'wrong' ? 'bg-red-500 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                  ينام 🛌
               </button>
            </div>
            {feedback3 === 'correct' && <p className="text-orange-600 font-bold text-lg">وقت العلم والنشاط! 🐦</p>}
          </div>
        </motion.div>

        {/* شاشة التخرج - عرضي */}
        <motion.div className="bg-[#8B4513]/10 rounded-3xl p-10 border-dashed border-4 border-yellow-500 flex flex-col md:flex-row items-center gap-10 text-right">
            <div className="text-9xl animate-bounce">🏆</div>
            <div className="space-y-4">
              <h2 className="text-yellow-600 font-bold text-3xl m-0">ألف مبروك التخرج!</h2>
              <p className="text-[#8B4513] text-xl font-bold m-0">
                  لقد أصبحت المعلم الأول والصديق الأوفى لبِنْيَة. خُذ وسامك الذهبي! 🥇
              </p>
            </div>
        </motion.div>
      </div>
    )}
  </div>
)}

          
        </>
        )}
      </div>
        

        </div>
      </div>
    </section>
  )
}