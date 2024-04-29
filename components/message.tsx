/**
 * This file defines a message display for the application.
 *
 * It exports a `BotMessage` component that manages the state of the message content, handles the rendering of the message content with markdown, and controls the display of the message.
 * It also provides functionality to handle streamable values and external links in the message content.
 *
 * @module components/message
 */
'use client'

import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { MemoizedReactMarkdown } from './ui/markdown'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'

export function BotMessage({
  content
}: {
  content: string | StreamableValue<string>
}) {
  const [data, error, pending] = useStreamableValue(content)

  // Currently, sometimes error occurs after finishing the stream.
  if (error) return <div>Error</div>

  return (
    <MemoizedReactMarkdown
      rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}
      remarkPlugins={[remarkGfm]}
      className="prose-sm prose-neutral prose-a:text-accent-foreground/50"
    >
      {data}
    </MemoizedReactMarkdown>
  )
}
