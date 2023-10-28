import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavigationMenuBar from '@/components/ui/navigation/nav-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Pub',
  description: 'Come for the Stories, Stay for the Community!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><NavigationMenuBar />{children}</body>
    </html>
  )
}
