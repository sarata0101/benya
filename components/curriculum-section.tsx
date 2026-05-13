"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, BookOpen, CheckCircle2, Compass, Star, Sparkles, Triangle, Baby, Gift, MessageCircle, HelpCircle, Leaf, Heart, Link2, Apple, MousePointer2, Trophy, DoorOpen, RefreshCw } from "lucide-react"
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
// المحطة الأولى: بِنْيَة يُحب



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
  

// المحطة الأولى: البنت تحب التفاح
const [wordsList1, setWordsList1] = useState([
    { id: 2, index: 0, text: 'البنت', voice: 'girl_word_voice' },
    { id: 1, index: 1, text: 'تحب', voice: 'loves_word_voice' },
    { id: 7, index: 2, text: 'التفاح', voice: 'apple_word_voice' }
]);
const [isCorrect1, setIsCorrect1] = useState(false);
const [clickCount1, setClickCount1] = useState(0);

// المحطة الثانية: القطة تشرب الحليب
const [wordsList2, setWordsList2] = useState([
    { id: 4, index: 0, text: 'القطة', voice: 'cat_word_voice' },
    { id: 3, index: 1, text: 'تشرب', voice: 'drinks_word_voice' },
    { id: 8, index: 2, text: 'الحليب', voice: 'milk_word_voice' }
]);
const [isCorrect2, setIsCorrect2] = useState(false);
const [clickCount2, setClickCount2] = useState(0);

// المحطة الثالثة: الولد يلعب الكرة
const [wordsList3, setWordsList3] = useState([
    { id: 6, index: 0, text: 'الولد', voice: 'boy_word_voice' },
    { id: 5, index: 1, text: 'يلعب', voice: 'plays_word_voice' },
    { id: 9, index: 2, text: 'بالكرة', voice: 'ball_word_voice' }
]);
const [isCorrect3, setIsCorrect3] = useState(false);
const [clickCount3, setClickCount3] = useState(0);

  

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
          {/* Lesson 1 - Level 2 - Sequential Audio & Mobile Optimized */}
{activeLesson === 1 && (
  <div className="prose prose-lg max-w-none px-2">
    {!lessonStarted ? (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onViewportEnter={() => {
            stopAllSounds();
            playSound('magic_portal'); 
        }}
        className="text-center py-16 bg-[#8B4513]/5 rounded-3xl border border-[#8B4513]/10 my-6"
      >
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
          className="inline-block mb-6"
        >
          <Compass className="w-24 h-24 text-[#10b981]" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-4 text-[#8B4513]">مرحباً بك في المستوى الثاني!</h2>
        <p className="text-muted-foreground mb-8 text-lg">هل تستطيع تخمين الكلمة الصحيحة؟ اضغط لنبدأ!</p>
        <Button 
          size="lg" 
          className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-10 py-6 text-xl shadow-lg" 
          onClick={() => {
              stopAllSounds();
              setLessonStarted(true);
          }}
        >
          بوابة بِنْيَة السحرية
        </Button>
      </motion.div>
    ) : (
      <div className="space-y-10 py-4">
        {/* Title */}
        <div className="flex items-center gap-3 mb-8 border-b border-[#8B4513]/10 pb-4">
          <Link2 className="w-8 h-8 text-[#10b981]" />
          <h2 className="font-bold text-2xl m-0 text-[#8B4513]">لعبة الربط</h2>
        </div>

        {/* Station 1: Cat and Dog */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          onClick={() => {
              stopAllSounds();
              // 1. Play the question first
              playSound('question_1_voice');
              
             
          }}
          className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col items-center shadow-md cursor-pointer transition-colors hover:border-[#10b981]/30"
        >
          <div className="text-7xl mb-6 bg-[#FFB347]/10 w-40 h-40 flex items-center justify-center rounded-3xl border-2 border-[#FFB347]/20 shadow-inner">
              🐱
          </div>
          <h3 className="text-[#10b981] font-bold text-xl mb-2 m-0">المحطة الأولى</h3>
          <p className="text-center text-gray-600 m-0 mb-6 italic text-lg leading-relaxed">"انقر هنا لسماع السؤال، ثم اختر الكلمة الصحيحة"</p>
          
          <div className="flex gap-6">
             <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  stopAllSounds();
                  playSound('cat_word_voice');
                  setTimeout(() => { playSound('correct_sound'); setFeedback1('correct'); }, 1000);
                }}
                className={`px-10 py-3 border-2 rounded-full font-bold text-lg transition-all ${feedback1 === 'correct' ? 'bg-green-500 text-white border-green-500 shadow-md scale-105' : 'bg-white border-green-200 text-green-700 hover:bg-green-50'}`}
             >
                قطة
             </button>
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  stopAllSounds();
                  playSound('dog_word_voice');
                  setTimeout(() => { playSound('wrong_sound'); setFeedback1('wrong'); }, 1000);
                }}
                className={`px-10 py-3 border-2 rounded-full font-bold text-lg transition-all ${feedback1 === 'wrong' ? 'bg-red-500 text-white border-red-500 shadow-md scale-95' : 'bg-white border-red-200 text-red-700 hover:bg-red-50'}`}
             >
                كلب
             </button>
          </div>
          {feedback1 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6 text-green-600 font-bold text-lg bg-green-50 px-6 py-2 rounded-full">أحسنتِ! هذه قطة جميلة 🐾</motion.p>}
        </motion.div>

        {/* Station 2: Apple and Banana */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          onClick={() => {
              stopAllSounds();
              playSound('question_2_voice');
              
          }}
          className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col items-center shadow-md cursor-pointer transition-colors hover:border-[#800020]/20"
        >
          <div className="text-7xl mb-6 bg-red-50 w-40 h-40 flex items-center justify-center rounded-3xl border-2 border-red-100 shadow-inner">
              🍎
          </div>
          <h3 className="text-[#800020] font-bold text-xl mb-2 m-0">المحطة الثانية</h3>
          <p className="text-center text-gray-600 m-0 mb-6 italic text-lg leading-relaxed">"انقر هنا لسماع السؤال، ثم اختر الكلمة الصحيحة""</p>
          
          <div className="flex gap-6">
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  stopAllSounds();
                  playSound('banana_word_voice');
                  setTimeout(() => { playSound('wrong_sound'); setFeedback2('wrong'); }, 1000);
                }}
                className={`px-10 py-3 border-2 rounded-full font-bold text-lg transition-all ${feedback2 === 'wrong' ? 'bg-red-500 text-white border-red-500 shadow-md scale-95' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
             >
                موز
             </button>
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  stopAllSounds();
                  playSound('apple_word_voice');
                  setTimeout(() => { playSound('correct_sound'); setFeedback2('correct'); }, 1600);
                }}
                className={`px-10 py-3 border-2 rounded-full font-bold text-lg transition-all ${feedback2 === 'correct' ? 'bg-red-500 text-white border-red-500 shadow-md scale-105' : 'bg-white border-red-200 text-red-700 hover:bg-red-50'}`}
             >
                تفاحة
             </button>
          </div>
          {feedback2 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6 text-green-600 font-bold text-lg bg-green-50 px-6 py-2 rounded-full">ممتاز! تفاحة حمراء لذيذة 🍎</motion.p>}
        </motion.div>

        {/* Station 3: Mouse and Elephant */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          onClick={() => {
              stopAllSounds();
              playSound('question_3_voice');
              // Sequence: Question -> Mouse -> Elephant
             
          }}
          className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col items-center shadow-md cursor-pointer transition-colors hover:border-blue-600/20"
        >
          <div className="text-7xl mb-6 bg-gray-50 w-40 h-40 flex items-center justify-center rounded-3xl border-2 border-gray-200 shadow-inner">
              🐭
          </div>
          <h3 className="text-blue-600 font-bold text-xl mb-2 m-0">المحطة الثالثة</h3>
          <p className="text-center text-gray-600 m-0 mb-6 italic text-lg leading-relaxed">"انقر هنا لسماع السؤال، ثم اختر الكلمة الصحيحة""</p>
          
          <div className="flex gap-6">
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  stopAllSounds();
                  playSound('elephant_word_voice');
                  setTimeout(() => { playSound('wrong_sound'); setFeedback3('wrong'); }, 1000);
                }}
                className={`px-10 py-3 border-2 rounded-full font-bold text-lg transition-all ${feedback3 === 'wrong' ? 'bg-red-500 text-white border-red-500 shadow-md scale-95' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
             >
                فيل
             </button>
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  stopAllSounds();
                  playSound('mouse_word_voice');
                  setTimeout(() => { playSound('correct_sound'); setFeedback3('correct'); }, 1000);
                }}
                className={`px-10 py-3 border-2 rounded-full font-bold text-lg transition-all ${feedback3 === 'correct' ? 'bg-blue-500 text-white border-blue-500 shadow-md scale-105' : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50'}`}
             >
                فأر
             </button>
          </div>
          {feedback3 === 'correct' && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6 text-green-600 font-bold text-lg bg-green-50 px-6 py-2 rounded-full">إجابة صحيحة! أنا الفأر بِنْيَة 🐭</motion.p>}
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
        {/* الدرس 1 - المستوى الثالث - صانع الجمل المطور للأطفال */}
{activeLesson === 1 && (
  <div className="prose prose-lg max-w-none px-2" dir="rtl">
    {!lessonStarted ? (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onViewportEnter={() => { stopAllSounds(); playSound('magic2_portal'); }}
        className="text-center py-12 bg-[#8B4513]/5 rounded-3xl border border-[#8B4513]/10 my-6"
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4">
          <div className="text-6xl">📜</div> 
        </motion.div>
        <h2 className="text-xl font-bold text-[#8B4513] mb-2">يا بطل! هيا نجمع الكلمات لنصنع جملة.</h2>
        <Button 
          size="default" 
          className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-8 py-4 text-lg shadow-md" 
          onClick={() => {
              stopAllSounds();
              setLessonStarted(true);
          }}
        >
          اضغط لنبدأ!
        </Button>
      </motion.div>
    ) : (
      <div className="space-y-8 py-4 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6 border-b border-[#8B4513]/10 pb-4">
          <PenTool className="w-6 h-6 text-[#10b981]" />
          <h2 className="font-bold text-xl m-0 text-[#8B4513]">صانع الجمل</h2>
        </div>

        {/* محطة 1: البنت تحب التفاح */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          onClick={() => { if(!isCorrect1) { stopAllSounds(); playSound('question_level3_1_voice'); } }}
          className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center shadow-sm cursor-pointer"
        >
          <div className="text-5xl mb-4 bg-green-50 w-24 h-24 flex items-center justify-center rounded-full border-2 border-green-100">👧🍎</div>
          <h3 className="text-[#10b981] font-bold text-lg mb-1">المحطة الأولى</h3>
          <p className="text-center text-gray-600 text-sm m-0 mb-5 italic">" رتب الكلمات لتصف الصورة"</p>
          
          <div className="flex flex-row justify-center gap-2 mb-6" dir="rtl">
              {wordsList1.map((word) => (
                <motion.div 
                  layout 
                  key={word.id} 
                  onClick={(e) => { e.stopPropagation(); stopAllSounds(); playSound(word.voice); }}
                  className={`px-4 py-2 border-2 rounded-xl font-bold text-base transition-all ${isCorrect1 ? 'bg-green-500 text-white border-green-500' : 'bg-white border-gray-100 text-gray-700'}`}
                >
                  {word.text}
                </motion.div>
              ))}
          </div>

          {!isCorrect1 ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                stopAllSounds();
                const nextCount = clickCount1 + 1;
                setClickCount1(nextCount);

                if (nextCount >= 1) {
                  const forced = [
                    { id: 2, index: 0, text: 'البنت', voice: 'girl_word_voice' },
                    { id: 1, index: 1, text: 'تحب', voice: 'loves_word_voice' },
                    { id: 7, index: 2, text: 'التفاح', voice: 'apple_word_voice' }
                  ];
                  setWordsList1(forced);
                  setIsCorrect1(true);
                  playSound('correct1_sound');
                } else {
                  const newList = [...wordsList1];
                  const shifted = newList.shift();
                  if (shifted) newList.push(shifted);
                  setWordsList1(newList);
                  playSound('wrong_sound');
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-2 text-sm flex gap-2 items-center shadow-sm"
            >
              <RefreshCw className="w-4 h-4" /> تبديل الكلمات
            </Button>
          ) : (
            <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-green-600 font-bold text-sm bg-green-50 px-4 py-1 rounded-full">أحسنت! الجملة صحيحة هي البنت تحب التفاح 🍏</motion.p>
          )}
        </motion.div>

        {/* محطة 2: القطة تشرب الحليب */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          onClick={() => { if(!isCorrect2) { stopAllSounds(); playSound('question_level3_2_voice'); } }}
          className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center shadow-sm cursor-pointer"
        >
          <div className="text-5xl mb-4 bg-blue-50 w-24 h-24 flex items-center justify-center rounded-full border-2 border-blue-100">🐱🥛</div>
          <h3 className="text-[#800020] font-bold text-lg mb-1">المحطة الثانية</h3>
          <p className="text-center text-gray-600 text-sm m-0 mb-5 italic">"ماذا تفعل القطة؟ رتب الجملة"</p>
          
          <div className="flex flex-row justify-center gap-2 mb-6" dir="rtl">
              {wordsList2.map((word) => (
                <motion.div 
                  layout 
                  key={word.id} 
                  onClick={(e) => { e.stopPropagation(); stopAllSounds(); playSound(word.voice); }}
                  className={`px-4 py-2 border-2 rounded-xl font-bold text-base transition-all ${isCorrect2 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-100 text-gray-700'}`}
                >
                  {word.text}
                </motion.div>
              ))}
          </div>

          {!isCorrect2 ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                stopAllSounds();
                const nextCount = clickCount2 + 1;
                setClickCount2(nextCount);

                if (nextCount >= 1) {
                  const forced = [
                    { id: 4, index: 0, text: 'القطة', voice: 'cat_word_voice' },
                    { id: 3, index: 1, text: 'تشرب', voice: 'drinks_word_voice' },
                    { id: 8, index: 2, text: 'الحليب', voice: 'milk_word_voice' }
                  ];
                  setWordsList2(forced);
                  setIsCorrect2(true);
                  playSound('correct2_sound');
                } else {
                  const newList = [...wordsList2];
                  const shifted = newList.shift();
                  if (shifted) newList.push(shifted);
                  setWordsList2(newList);
                  playSound('wrong_sound');
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-2 text-sm flex gap-2 items-center shadow-sm"
            >
              <RefreshCw className="w-4 h-4" /> تبديل الكلمات
            </Button>
          ) : (
            <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-1 rounded-full">أحسنت! الجملة هي القطة تشرب الحليب 🥛</motion.p>
          )}
        </motion.div>

        {/* محطة 3: الولد يلعب بالكرة */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          onClick={() => { if(!isCorrect3) { stopAllSounds(); playSound('question_level3_3_voice'); } }}
          className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center shadow-sm cursor-pointer"
        >
          <div className="text-5xl mb-4 bg-orange-50 w-24 h-24 flex items-center justify-center rounded-full border-2 border-orange-100">👦⚽</div>
          <h3 className="text-orange-600 font-bold text-lg mb-1">المحطة الثالثة</h3>
          <p className="text-center text-gray-600 text-sm m-0 mb-5 italic">"رتب جملة اللعب بالكرة"</p>
          
          <div className="flex flex-row justify-center gap-2 mb-6" dir="rtl">
              {wordsList3.map((word) => (
                <motion.div 
                  layout 
                  key={word.id} 
                  onClick={(e) => { e.stopPropagation(); stopAllSounds(); playSound(word.voice); }}
                  className={`px-4 py-2 border-2 rounded-xl font-bold text-base transition-all ${isCorrect3 ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border-gray-100 text-gray-700'}`}
                >
                  {word.text}
                </motion.div>
              ))}
          </div>

          {!isCorrect3 ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                stopAllSounds();
                const nextCount = clickCount3 + 1;
                setClickCount3(nextCount);

                if (nextCount >= 1) {
                  const forced = [
                    { id: 6, index: 0, text: 'الولد', voice: 'boy_word_voice' },
                    { id: 5, index: 1, text: 'يلعب', voice: 'plays_word_voice' },
                    { id: 9, index: 2, text: 'بالكرة', voice: 'ball_word_voice' }
                  ];
                  setWordsList3(forced);
                  setIsCorrect3(true);
                  playSound('correct3_sound');
                } else {
                  const newList = [...wordsList3];
                  const shifted = newList.shift();
                  if (shifted) newList.push(shifted);
                  setWordsList3(newList);
                  playSound('wrong_sound');
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-2 text-sm flex gap-2 items-center shadow-sm"
            >
              <RefreshCw className="w-4 h-4" /> تبديل الكلمات
            </Button>
          ) : (
            <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-orange-600 font-bold text-sm bg-orange-50 px-4 py-1 rounded-full">  أحسنت! الجملة هي الولد يلعب بالكرة⚽</motion.p>
          )}
        </motion.div>

        {/* الاحتفال النهائي */}
{isCorrect1 && isCorrect2 && isCorrect3 && (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    transition={{ delay: 10 }} // بنأخر ظهور الـ div نفسه شوية عشان الطفل يلحق يفرح بالمحطة الأخيرة
    onViewportEnter={() => { 
        // هنستنى ثانية ونصف قبل ما نوقف الأصوات القديمة ونشغل صوت الاحتفال
        setTimeout(() => {
            stopAllSounds(); 
            playSound('celebration3_fanfare'); 
        }, 10000); 
    }}
    className="bg-yellow-50 rounded-2xl p-6 border-dashed border-2 border-yellow-200 text-center shadow-sm"
  >
      <div className="text-5xl mb-2 animate-bounce">🏆</div>
      <h2 className="text-green-600 font-bold text-xl mb-1">مُبارك أيها المؤلف!</h2>
      <p className="text-[#8B4513] font-bold text-sm m-0">لقد حصلتَ على (وسام المؤلف الصغير) ✨</p>
  </motion.div>
)}
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
         {activeLesson === 1 && (
  <div className="prose prose-lg max-w-none px-2">
    {!lessonStarted ? (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onViewportEnter={() => { stopAllSounds(); playSound('magic3_portal'); }}
        className="text-center py-16 bg-[#8B4513]/5 rounded-3xl border border-[#8B4513]/10 my-6"
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-6">
          <div className="text-7xl">🗺️</div>
        </motion.div>
        <h2 className="text-2xl font-bold text-[#8B4513] mb-4">أهلاً بالقائد! بِنْيَة يحتاج ذكاءك ليحل المشكلات.</h2>
        <p className="text-muted-foreground mb-8 text-lg">هل أنتَ جاهزٌ لتولي القيادة؟</p>
        <button 
          className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-10 py-6 text-xl shadow-lg transition-colors" 
          onClick={() => {
              stopAllSounds();
              setLessonStarted(true);
          }}
        >
          اضغط لننطلق!
        </button>
      </motion.div>
    ) : (
      <div className="space-y-10 py-4">
        <div className="flex items-center gap-3 mb-8 border-b border-[#8B4513]/10 pb-4">
          <span className="text-3xl">🎖️</span>
          <h2 className="font-bold text-2xl m-0 text-[#8B4513]">مهمة القائد</h2>
        </div>

        {/* محطة حل المشكلة - المطر */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col items-center shadow-md transition-colors hover:border-[#10b981]/30"
        >
          <div className="text-6xl mb-6 bg-blue-50 w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-blue-100 relative">
              <span className={feedback1 === 'correct' ? '' : 'animate-bounce'}>👦</span>
              {feedback1 !== 'correct' && <span className="absolute top-2 text-2xl">🌧️</span>}
              {feedback1 === 'correct' && <span className="absolute -top-2 text-4xl text-green-500">⛱️</span>}
          </div>
          <h3 className="text-[#10b981] font-bold text-xl mb-2 m-0">المحطة الأولى</h3>
          <p 
            onMouseEnter={() => { stopAllSounds(); playSound('q1_rain_voice'); }}
            className="text-center text-gray-700 m-0 mb-6 font-medium italic cursor-help"
          >
            "السماء تمطر! ماذا يحتاج بِنْيَة؟"
          </p>
          
          <div className="flex gap-4 mb-2">
              <button 
                onMouseEnter={() => { stopAllSounds(); playSound('umbrella_voice'); }}
                onClick={() => { 
                  stopAllSounds(); 
                  playSound('umbrella_voice'); // ينطق اسم الاختيار أولاً
                  setTimeout(() => {
                    setFeedback1('correct'); 
                    playSound('correct_sound'); // ثم صوت النتيجة
                  }, 1200);
                }}
                className={`px-8 py-3 border-2 rounded-xl font-bold text-lg transition-all ${feedback1 === 'correct' ? 'bg-green-500 text-white border-green-500 shadow-sm' : 'bg-white border-green-200 text-green-700 hover:bg-green-50'}`}
              >
                شمسية ☂️
              </button>
              <button 
                onMouseEnter={() => { stopAllSounds(); playSound('book_voice'); }}
                onClick={() => { 
                  stopAllSounds(); 
                  playSound('book_voice');
                  setTimeout(() => {
                    setFeedback1('wrong'); 
                    playSound('wrong_sound'); 
                  }, 1200);
                }}
                className={`px-8 py-3 border-2 rounded-xl font-bold text-lg transition-all ${feedback1 === 'wrong' ? 'bg-red-500 text-white border-red-500 shadow-sm' : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'}`}
              >
                كتاب 📖
              </button>
          </div>
          {feedback1 === 'correct' && <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-6 text-green-600 font-bold text-lg bg-green-50 px-6 py-2 rounded-full">رائع! لقد توقف المطر بفضلك 🎵</motion.p>}
          {feedback1 === 'wrong' && <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-6 text-red-600 font-bold text-lg bg-red-50 px-6 py-2 rounded-full">الكتاب سيبتل! بِنْيَة يحتاج المظلة.</motion.p>}
        </motion.div>

        {/* محطة ترتيب المنطق - النوم */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }} 
          className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col items-center shadow-md transition-colors hover:border-[#800020]/30"
        >
          <div className={`text-6xl mb-6 w-32 h-32 flex items-center justify-center rounded-2xl border-2 transition-colors duration-1000 ${feedback2 === 'correct' ? 'bg-red-900/20 border-red-900/30' : 'bg-yellow-50 border-yellow-100'}`}>
              {feedback2 === 'correct' ? '🌙💤' : '🛌☀️'}
          </div>
          <h3 className="text-[#800020] font-bold text-xl mb-2 m-0">المحطة الثانية</h3>
          <p 
            onMouseEnter={() => { stopAllSounds(); playSound('q2_sleep_voice'); }}
            className="text-center text-gray-700 m-0 mb-6 font-medium italic cursor-help"
          >
            "اختر الوقت المناسب للنوم"
          </p>
          
          <div className="flex gap-4 mb-2">
              <button 
                onMouseEnter={() => { stopAllSounds(); playSound('morning_voice'); }}
                onClick={() => { 
                  stopAllSounds(); 
                  playSound('morning_voice');
                  setTimeout(() => {
                    setFeedback2('wrong'); 
                    playSound('wrong_sound'); 
                  }, 1200);
                }}
                className={`px-8 py-3 border-2 rounded-xl font-bold text-lg transition-all ${feedback2 === 'wrong' ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-white border-gray-200 text-gray-400 hover:bg-orange-50'}`}
              >
                صباحاً ☀️
              </button>
              <button 
                onMouseEnter={() => { stopAllSounds(); playSound('night_voice'); }}
                onClick={() => { 
                  stopAllSounds(); 
                  playSound('night_voice');
                  setTimeout(() => {
                    setFeedback2('correct'); 
                    playSound('correct_sound'); 
                  }, 1200);
                }}
                className={`px-8 py-3 border-2 rounded-xl font-bold text-lg transition-all ${feedback2 === 'correct' ? 'bg-[#800020] text-white border-[#800020] shadow-sm' : 'bg-white border-red-200 text-[#800020] hover:bg-red-50'}`}
              >
                ليلاً 🌙
              </button>
          </div>
          {feedback2 === 'correct' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-[#800020] font-bold text-lg bg-red-50 px-6 py-2 rounded-full">ليلاً.. أحلام سعيدة لـ بِنْيَة ✨</motion.p>}
          {feedback2 === 'wrong' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-orange-600 font-bold text-lg bg-orange-50 px-6 py-2 rounded-full">الصباح للعب والنشاط، نحن ننام ليلاً.</motion.p>}
        </motion.div>

        {/* محطة تصنيف الأشياء - الفوضى */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }} 
          className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col items-center shadow-md transition-colors hover:border-blue-500/30"
        >
          <div className="grid grid-cols-2 gap-6 mb-6 w-full max-w-md">
              <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50/50">
                  <span className="block text-5xl mb-2">📦</span>
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">صندوق الفواكه</span>
              </div>
              <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50/50">
                  <span className="block text-5xl mb-2">🧸</span>
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">صندوق الألعاب</span>
              </div>
          </div>
          <h3 className="text-blue-600 font-bold text-xl mb-2 m-0">المحطة الثالثة</h3>
          <p 
            onMouseEnter={() => { stopAllSounds(); playSound('q3_sort_voice'); }}
            className="text-center text-gray-700 m-0 mb-6 font-medium italic cursor-help"
          >
            "أين نضع السيارة والموزة?"
          </p>
          
          <div className="flex flex-col gap-4 w-full max-w-sm">
             <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-4xl">🍌</span>
                <div className="flex gap-3">
                    <button 
                      onMouseEnter={() => { stopAllSounds(); playSound('fruits_voice'); }}
                      onClick={() => { 
                        stopAllSounds(); 
                        playSound('fruits_voice'); 
                        setTimeout(() => {
                          setFeedback3((prev) => prev ? prev + ' correct-1' : 'correct-1'); 
                          playSound('correct_sound'); 
                        }, 1600);
                      }} 
                      className={`p-2 px-5 rounded-lg text-sm font-bold transition-all ${feedback3?.includes('correct-1') ? 'bg-green-500 text-white shadow-sm' : 'bg-white border border-gray-200 hover:border-green-300'}`}
                    >
                      فواكه
                    </button>
                    <button 
                      onMouseEnter={() => { stopAllSounds(); playSound('toys_voice'); }}
                      onClick={() => { 
                        stopAllSounds(); 
                        playSound('toys_voice'); 
                        setTimeout(() => {
                          playSound('wrong_sound'); 
                          setFeedback3('wrong-1'); 
                        }, 1600);
                      }} 
                      className={`p-2 px-5 rounded-lg text-sm font-bold transition-all ${feedback3 === 'wrong-1' ? 'bg-red-500 text-white shadow-sm' : 'bg-white border border-gray-200 hover:border-red-300'}`}
                    >
                      ألعاب
                    </button>
                </div>
             </div>
             <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-4xl">🚗</span>
                <div className="flex gap-3">
                    <button 
                      onMouseEnter={() => { stopAllSounds(); playSound('fruits_voice'); }}
                      onClick={() => { 
                        stopAllSounds(); 
                        playSound('fruits_voice'); 
                        setTimeout(() => {
                          playSound('wrong_sound'); 
                          setFeedback3('wrong-2'); 
                        }, 1600);
                      }} 
                      className={`p-2 px-5 rounded-lg text-sm font-bold transition-all ${feedback3 === 'wrong-2' ? 'bg-red-500 text-white shadow-sm' : 'bg-white border border-gray-200 hover:border-red-300'}`}
                    >
                      فواكه
                    </button>
                    <button 
                      onMouseEnter={() => { stopAllSounds(); playSound('toys_voice'); }}
                      onClick={() => { 
                        stopAllSounds(); 
                        playSound('toys_voice'); 
                        setTimeout(() => {
                          setFeedback3((prev) => prev ? prev + ' correct-2' : 'correct-2'); 
                          playSound('correct_sound'); 
                        }, 1600);
                      }} 
                      className={`p-2 px-5 rounded-lg text-sm font-bold transition-all ${feedback3?.includes('correct-2') ? 'bg-blue-500 text-white shadow-sm' : 'bg-white border border-gray-200 hover:border-blue-300'}`}
                    >
                      ألعاب
                    </button>
                </div>
             </div>
          </div>
          {feedback3?.includes('correct') && <motion.p initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="mt-6 text-green-600 font-bold text-lg bg-green-50 px-6 py-2 rounded-full">أحسنت! بِنْيَة يقفز فرحاً بالنظام 🐭✨</motion.p>}
        </motion.div>

        {/* شاشة الاحتفال */}
{feedback1 === 'correct' && feedback2 === 'correct' && feedback3?.includes('correct-1') && feedback3?.includes('correct-2') && (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ delay: 4 }} // هيستنى ثانيتين ونصف قبل ما يبدأ يظهر الأنيميشن
    onViewportEnter={() => { 
        // بنأخر الـ stopAllSounds عشان متقطعش صوت الكلمة الأخيرة
        setTimeout(() => {
            stopAllSounds(); 
            playSound('celebration3_fanfare'); 
        }, 4000); // نفس وقت الـ delay لضمان التزامن بين الصوت والصورة
    }}
    className="bg-[#F5F5DC] rounded-3xl p-10 border-dashed border-4 border-[#10b981]/30 text-center relative overflow-hidden shadow-lg my-8"
  >
      <div className="absolute inset-0 pointer-events-none flex justify-around items-start opacity-30">
          <span className="text-2xl animate-bounce">🚩</span>
          <span className="text-2xl animate-bounce delay-75">🎖️</span>
          <span className="text-2xl animate-bounce delay-150">🚩</span>
      </div>
      <div className="text-6xl mb-4">🚩👦💚</div>
      <h2 className="text-[#10b981] font-bold text-3xl mb-2 m-0">أنت رائع!</h2>
      <p className="text-[#8B4513] font-bold text-xl m-0">لقد حصلتَ على (وسام القائد الذكي)</p>
      <div className="mt-6 flex justify-center">
          <span className="bg-[#10b981] text-white px-8 py-2 rounded-full text-lg font-bold shadow-xl animate-pulse tracking-wide">راية القيادة</span>
      </div>
  </motion.div>
)}
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
          {/* الدرس 1 - المستوى الخامس - تنسيق رأسي منضبط وأحجام صغيرة */}
{activeLesson === 1 && (
  <div className="prose prose-lg max-w-none px-2">
    {!lessonStarted ? (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onViewportEnter={() => { stopAllSounds(); playSound('magic24_portal'); }}
        className="text-center py-12 bg-[#8B4513]/5 rounded-2xl border border-[#8B4513]/10 my-6"
      >
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-6">
          <div className="text-5xl">🎓⌚</div>
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-3">أهلاً يا معلمي الصغير!</h2>
        <Button 
          size="default" 
          className="bg-[#10b981] hover:bg-[#059669] text-white rounded-full px-8 py-4 text-lg shadow-md" 
          onClick={() => {
              stopAllSounds();
              setLessonStarted(true);
          }}
        >
          اضغط لنبدأ المهمة!
        </Button>
      </motion.div>
    ) : (
      <div className="space-y-6 py-4">
        <div className="flex items-center gap-3 mb-4 border-b border-[#8B4513]/10 pb-3">
          <span className="text-2xl">🌟</span>
          <h2 className="font-bold text-xl m-0 text-[#8B4513]">مهمة المعلم الصغير</h2>
        </div>

        {/* محطة الاعتذار - البوكس كله بيشغل الصوت */}
        <motion.div 
          onClick={() => { stopAllSounds(); playSound('q1_sorry_voice'); }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="text-4xl bg-gray-50 w-24 h-24 flex items-center justify-center rounded-xl border-2 border-gray-50 flex-shrink-0 mb-4 shadow-sm">
              {feedback1 === 'correct' ? '🤝💚' : '👦🧊'} 
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-[#10b981] font-bold text-lg m-0">المحطة الأولى: الاعتذار</h3>
            <p className="text-gray-600 text-sm m-0 italic leading-relaxed px-4">
              "بِنْيَة أوقع مكعبات صديقه بالخطأ.. ماذا يقول؟"
            </p>
            
            {/* أزرار الإجابات - نستخدم e.stopPropagation عشان لما نضغط عالزرار ميشغلش صوت السؤال تاني */}
            <div className="flex gap-3 justify-center pt-2">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    stopAllSounds(); 
                    playSound('sorry_voice'); 
                    setTimeout(() => {
                      setFeedback1('correct'); 
                      playSound('correct_sound'); 
                    }, 1600);
                  }}
                  className={`px-6 py-2 border rounded-xl font-bold text-sm transition-all ${feedback1 === 'correct' ? 'bg-green-500 text-white shadow-md' : 'bg-white border-green-100 text-green-700'}`}>
                  آسف
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    stopAllSounds(); 
                    playSound('dont_care_voice'); 
                    setTimeout(() => {
                      setFeedback1('wrong'); 
                      playSound('wrong_sound'); 
                    }, 1500);
                  }}
                  className={`px-6 py-2 border rounded-xl font-bold text-sm transition-all ${feedback1 === 'wrong' ? 'bg-red-500 text-white' : 'bg-white border-gray-100 text-gray-400'}`}>
                  لا يهمني
                </button>
            </div>
            {feedback1 && (
              <p className={`font-bold text-xs mt-2 ${feedback1 === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback1 === 'correct' ? 'أحسنت! الاعتذار صفة الأبطال 🟢' : 'بِنْيَة لطيف ويجب أن يعتذر.'}
              </p>
            )}
          </div>
        </motion.div>

        {/* محطة المشاركة - البوكس كله بيشغل الصوت */}
        <motion.div 
          onClick={() => { stopAllSounds(); playSound('q2_share_voice'); }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="text-4xl bg-blue-50 w-24 h-24 flex items-center justify-center rounded-xl border-2 border-blue-50 flex-shrink-0 mb-4">
              {feedback2 === 'correct' ? '🎈🎈' : '👦😢'}
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-[#800020] font-bold text-lg m-0">المحطة الثانية: المشاركة</h3>
            <p className="text-gray-600 text-sm m-0 italic leading-relaxed px-4">
              "كيف نجعل الجميع سعداء؟"
            </p>
            
            <div className="flex gap-3 justify-center pt-2">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    stopAllSounds(); 
                    playSound('play_together_voice');
                    setTimeout(() => {
                      setFeedback2('correct'); 
                      playSound('correct_sound'); 
                    }, 1600);
                  }}
                  className={`px-6 py-2 border rounded-xl font-bold text-sm transition-all ${feedback2 === 'correct' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-blue-100 text-blue-700'}`}>
                  نلعب معاً
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    stopAllSounds(); 
                    playSound('play_alone_voice');
                    setTimeout(() => {
                      setFeedback2('wrong'); 
                      playSound('wrong_sound'); 
                    }, 1600);
                  }}
                  className={`px-6 py-2 border rounded-xl font-bold text-sm transition-all ${feedback2 === 'wrong' ? 'bg-red-500 text-white' : 'bg-white border-gray-100 text-gray-400'}`}>
                  ألعب وحدي
                </button>
            </div>
            {feedback2 === 'correct' && <p className="text-blue-600 font-bold text-xs mt-2 text-center">اللعب مع الأصدقاء أجمل بكثير 🎈</p>}
          </div>
        </motion.div>

        {/* محطة إدارة الوقت - البوكس كله بيشغل الصوت */}
        <motion.div 
          onClick={() => { stopAllSounds(); playSound('q3_system_voice'); }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="text-4xl bg-yellow-50 w-24 h-24 flex items-center justify-center rounded-xl border-2 border-yellow-50 flex-shrink-0 mb-4">
              ☀️📖
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-orange-600 font-bold text-lg m-0">المحطة الثالثة: النظام</h3>
            <p className="text-gray-600 text-sm m-0 italic leading-relaxed px-4">
              "الشمس أشرقت.. ماذا يفعل بِنْيَة الآن؟"
            </p>
            
            <div className="flex gap-3 justify-center pt-2">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    stopAllSounds(); 
                    playSound('read_book_voice');
                    setTimeout(() => {
                      setFeedback3('correct'); 
                      playSound('correct_sound'); 
                    }, 1600);
                  }}
                  className={`px-6 py-2 border rounded-xl font-bold text-sm transition-all ${feedback3 === 'correct' ? 'bg-orange-500 text-white shadow-md' : 'bg-white border-orange-100 text-orange-700'}`}>
                  يقرأ كتاباً 📖
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    stopAllSounds(); 
                    playSound('sleep_voice');
                    setTimeout(() => {
                      setFeedback3('wrong'); 
                      playSound('wrong_sound'); 
                    }, 1600);
                  }}
                  className={`px-6 py-2 border rounded-xl font-bold text-sm transition-all ${feedback3 === 'wrong' ? 'bg-red-500 text-white' : 'bg-white border-gray-100 text-gray-400'}`}>
                  ينام 🛌
                </button>
            </div>
            {feedback3 === 'correct' && <p className="text-orange-600 font-bold text-xs mt-2 text-center">وقت العلم والنشاط! 🐦</p>}
          </div>
        </motion.div>

       {/* شاشة التخرج */}
{feedback1 === 'correct' && feedback2 === 'correct' && feedback3 === 'correct' && (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }} 
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 5 }} // هيستنى 3 ثواني كاملة عشان الطفل يسمع آخر جملة صحيحة ويستعد للتخرج
    onViewportEnter={() => { 
        // بنأخر صوت الفانفار النهائي عشان مبيقطعش أي صوت قبله
        setTimeout(() => {
            stopAllSounds(); 
            playSound('celebration4_fanfare'); 
        }, 5000); // متناغم مع وقت الـ delay
    }}
    className="bg-[#8B4513]/10 rounded-2xl p-6 border-dashed border-2 border-yellow-500 flex flex-col items-center text-center gap-3 shadow-inner"
  >
      <div className="text-6xl animate-bounce">🏆</div>
      <h2 className="text-yellow-600 font-bold text-xl m-0">ألف مبروك التخرج!</h2>
      <p className="text-[#8B4513] text-sm font-bold m-0 leading-relaxed px-2">
          لقد أصبحت المعلم الأول والصديق الأوفى لبِنْيَة. خُذ وسامك الذهبي! 🥇
      </p>
  </motion.div>
)}
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