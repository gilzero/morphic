/**
 * This file defines a `UserMessage` component for the application.
 *
 * The `UserMessage` component is used to display a user's message in the user interface.
 * It accepts a `message` prop which is the content of the message, and an `isFirstMessage` prop
 * which determines whether a top margin is applied to the message.
 *
 * @module components/user-message
 */
import { cn } from '@/lib/utils'
import React from 'react'

type UserMessageProps = {
  message: string
  isFirstMessage?: boolean
}

export const UserMessage: React.FC<UserMessageProps> = ({
  message,
  isFirstMessage
}) => {
  return (
    <div className={cn({ 'mt-4': !isFirstMessage })}>
      <div className="text-xl">{message}</div>
    </div>
  )
}
