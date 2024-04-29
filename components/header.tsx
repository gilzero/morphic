/**
 * This file defines the chat messages display for the application.
 *
 * It exports a `ChatMessages` component that retrieves the current state of messages using `useUIState` and returns a JSX element representing the chat messages.
 * Each message is wrapped in a `CollapsibleMessage` component, which could be responsible for displaying the message and handling its collapsed state.
 *
 * @module components/chat-messages
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-0 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div className="p-2">
        <a href="/">
          <IconLogo className={cn('w-5 h-5')} />
          <span className="sr-only">福州三坊七巷严复博物馆</span>
        </a>
      </div>
      <ModeToggle />
    </header>
  )
}

export default Header
