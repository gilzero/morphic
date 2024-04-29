/**
 * This file defines an empty screen for the application.
 *
 * It exports an `EmptyScreen` component that takes a `submitMessage` function and an optional `className` as props and returns a JSX element representing an empty screen.
 * The screen displays a list of example messages, each of which is a button. When a button is clicked, the `submitMessage` function is called with the message as an argument.
 *
 * The `exampleMessages` constant is defined to hold the example messages that are displayed on the screen.
 *
 * @module components/empty-screen
 */
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: '严复博物馆是什么？严复是谁？',
    message: '严复博物馆是什么？严复是谁？'
  },
  {
    heading: '福州三坊七巷严复博物馆有什么?',
    message: '福州三坊七巷严复博物馆有什么?'
  },
  {
    heading: '严复在中国近代教育史上有哪些影响?',
    message: '严复在中国近代教育史上有哪些影响?'
  },
  {
    heading: '严复翻译了哪些作品?',
    message: '严复翻译了哪些作品?'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
