/**
 * This file defines the footer for the application.
 *
 * It exports a `Footer` component that returns a JSX element representing the footer of the application.
 * The footer contains three buttons, each of which is a link to a different social media platform (Discord, Twitter, and GitHub).
 *
 * @module components/footer
 */
import React from 'react'
import Link from 'next/link'
import { SiDiscord, SiGithub, SiTwitter } from 'react-icons/si'
import { Button } from './ui/button'

const Footer: React.FC = () => {
  return (
    <footer className="w-fit p-1 md:p-2 fixed bottom-0 right-0">
      <div className="flex justify-end">
        {/*<Button
          variant={'ghost'}
          size={'icon'}
          className="text-muted-foreground/50"
        >
          <Link href="#" target="_blank">
            <SiDiscord size={18} />
          </Link>
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="text-muted-foreground/50"
        >
          <Link href="#" target="_blank">
            <SiTwitter size={18} />
          </Link>
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="text-muted-foreground/50"
        >
          <Link href="#" target="_blank">
            <SiGithub size={18} />
          </Link>
        </Button>*/}
      </div>
    </footer>
  )
}

export default Footer
