// filepath: app/layout.tsx
/**
 * This file defines a page in the application that displays the chat interface.
 *
 * It exports a `Page` component that returns the `Chat` component from `@/components/chat`.
 * The `Chat` component could be the main chat interface of your application.
 *
 * The `runtime` constant is defined and set to 'edge'. This could be used to determine the runtime environment of your application.
 *
 * @module app/page
 */
import { Chat } from '@/components/chat'

export const runtime = 'edge'

export default function Page() {
  return <Chat />
}
