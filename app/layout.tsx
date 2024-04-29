// filepath: app/layout.tsx
/**
 * This file defines the root layout for the application.
 *
 * It exports a `RootLayout` component that takes a `children` prop and returns a JSX element representing the layout of the application.
 * The layout includes a `ThemeProvider` that wraps the entire application, a `Header` and `Footer`, and the `children` components that are passed in.
 * The `AI` provider from `./action` is also used to wrap the `children` components.
 *
 * The `metadata` and `viewport` constants are defined to set up the metadata and viewport settings for the application.
 * The `fontSans` constant is defined using the `FontSans` function from `next/font/google` to set up a custom font for your application.
 *
 * @module app/layout
 */
import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { AI } from './action'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'Yanfu'
const description =
  'Yanfu AI-powered answer engine with a generative UI.'

export const metadata: Metadata = {
  metadataBase: new URL('https://yanfu.weiming.ai/'),
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@0'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <AI>{children}</AI>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
