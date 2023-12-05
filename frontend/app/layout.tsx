import './globals.css'
import type { Metadata } from 'next'
import NavigationMenuBar from '@/components/ui/navigation/nav-bar'
import { Toaster } from "@/components/ui/toaster"
import Footer from '@/components/ui/navigation/footer'

import merriWeather from './fonts/merriweather'

export const metadata: Metadata = {
  title: 'The Pub',
  description: 'Come for the Stories, Stay for the Community!',
}

// Check if Logged In or not

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={merriWeather.className}><NavigationMenuBar/>{children}
      <Footer/>{children}
      <Toaster /></body>
    </html>
  )
}
