import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitnessPro - Your Ultimate Fitness Platform',
  description: 'Transform your fitness journey with personalized workout plans, nutrition tracking, and progress monitoring.',
  keywords: 'fitness, workout, nutrition, health, exercise, training',
  authors: [{ name: 'FitnessPro Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}