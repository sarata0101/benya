import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// تم إيقاف استدعاء خطوط جوجل القديمة لأننا نستخدم الخطوط الخاصة من globals.css

export const metadata: Metadata = {
  title: 'بنية - منصة التكيف المعرفي',
  description: 'بنية.. نبني الفهمَ على قياسِك - منصة لدعم التخيل الذهني والوظائف التنفيذية',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#E5D7C4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background">
      {/* لاحظي يا سارة: شيلنا الـ variables بتاعة الخطوط القديمة من الـ html class 
          لأننا عرفنا الخطوط الجديدة مباشرة في globals.css داخل الـ body والـ h1-h6
      */}
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}