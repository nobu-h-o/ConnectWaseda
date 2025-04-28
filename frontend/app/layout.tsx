import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Alata } from "next/font/google" 
import "./globals.css"

const alata = Alata({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Waseda Event Project",
  description: "Find and join events at Waseda University",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={alata.className}>
      <body>{children}</body>
    </html>
  )
}