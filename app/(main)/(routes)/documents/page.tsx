'use client'
import { Button } from '@/components/ui/button'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'

const DocumentPage = () => {
  const { session } = useSessionContext()

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="empty"
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="empty"
        height="300"
        width="300"
        className="dark:block hidden"
      />
      <h2 className='text-base '>
        Welcome to {session?.user?.user_metadata?.name}&apos;s NotesJunction
      </h2>

      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a Note
      </Button>
    </div>
  )
}

export default DocumentPage
