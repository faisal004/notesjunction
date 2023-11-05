'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { UserButton, useAuth, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '@/components/spinner'

const Heading = () => {
  const { isLoaded, isSignedIn }=useAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{' '}
        <span className="underline">NotesJunction</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-semibold">
        NotesJunction is the connected workspace where <br /> better,faster,work
        happens.
      </h3>

      {isLoaded && isSignedIn ? (
        <Link href="/document">
          <Button>
            Enter
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      ) : (
        <Link href="/sign-in">
          <Button>
            Log In
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      )}
    </div>
  )
}

export default Heading
