/**
 * This file defines a `ThemeProvider` component for the application.
 *
 * The `ThemeProvider` component is a wrapper around the `ThemeProvider` from `next-themes`.
 * It accepts all the props that `next-themes`'s `ThemeProvider` does and passes them along,
 * providing a convenient way to apply themes in the application.
 *
 * @module components/theme-provider
 */
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
