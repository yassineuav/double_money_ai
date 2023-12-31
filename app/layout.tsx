"use client"
import NavBar from '@/components/navbar';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
      document.documentElement.classList.add('dark');
    
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <NavBar />
      </body>
    </html>
  )
}
