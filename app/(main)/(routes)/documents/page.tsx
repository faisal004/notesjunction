'use client'
import { Button } from '@/components/ui/button'
import { useSessionContext } from '@supabase/auth-helpers-react'
import axios from 'axios'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

const DocumentPage = () => {
  const { session } = useSessionContext()
  const onCreate = async () => {
    try {
      const res = await axios.post('/api/documents', { title: 'Untitled' })
      toast('New note created', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
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
      <h2 className="text-base ">
        Welcome to {session?.user?.user_metadata?.name}&apos;s NotesJunction
      </h2>

      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a Note
      </Button>
    </div>
  )
}

export default DocumentPage
