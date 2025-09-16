import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Golden Dragon Admin Panel',
  description: 'Admin control panel for Golden Dragon Restaurant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-100">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

