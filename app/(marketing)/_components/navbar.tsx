'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import useScrollTop from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { UserButton, useAuth, useUser } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
  const scrolled = useScrollTop()
  const { isLoaded, isSignedIn } = useAuth()
  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6 ',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <div className="hidden md:flex items-center gap-x-2 text-xl font-bold hover:underline cursor-pointer">
        NotesJunction
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
        {isSignedIn && isLoaded ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in">
            <Button variant="outline">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
