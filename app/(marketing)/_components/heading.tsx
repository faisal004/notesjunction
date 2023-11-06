'use client'

import { Button } from '@/components/ui/button'
import { useSessionContext } from '@supabase/auth-helpers-react'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Heading = () => {
  const { session, error, isLoading } = useSessionContext()
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

      {session?.user?.aud === 'authenticated' && !isLoading ? (
        <Link href="/documents">
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
