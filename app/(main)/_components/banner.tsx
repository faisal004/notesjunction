'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/modals/confirm-modal'
import axios from 'axios'
import toast from 'react-hot-toast'
import { createClient } from '@supabase/supabase-js'

interface BannerProps {
  documentId: number
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter()

  const onRestore = async () => {
    try {
      const { error } = await supabase
        .from('Document')
        .update({ isArchived: false })
        .eq('id', documentId)

      if (error) {
        
        throw error
      }
      toast.success('Restored', {
        position: 'bottom-center',
      })
    } catch (error:any) {
      console.error('Error restoring:', error.message)
    }
  }
  const onRemove = async () => {
    try {
      const { error } = await supabase.from('Document').delete().eq('id', documentId)

      if (error) {
        throw error
      }
      toast.success('Deleted', {
        position: 'bottom-center',
      })
    } catch (error) {
      console.log('Error Deleting')
    }
  }

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  )
}
