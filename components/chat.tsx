// filepath: components/chat.tsx
/**
 * This file defines the chat interface for the application.
 *
 * It exports a `Chat` component that returns a JSX element representing the chat interface.
 * The interface is divided into two main parts: the `ChatMessages` component, which could be responsible for displaying the chat messages, and the `ChatPanel` component, which could be responsible for inputting and sending new messages.
 *
 * @module components/chat
 */
'use client'

import { ChatPanel } from './chat-panel'
import { ChatMessages } from './chat-messages'

export function Chat() {
  return (
    <div className="px-8 md:px-12 pt-6 md:pt-8 pb-14 md:pb-24 max-w-3xl mx-auto flex flex-col space-y-3 md:space-y-4">
      <ChatMessages />
      <ChatPanel />
    </div>
  )
}
