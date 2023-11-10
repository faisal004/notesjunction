'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/modals/confirm-modal'
import axios from 'axios'
import toast from 'react-hot-toast'

interface BannerProps {
  documentId: number
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter()

  const onRestore = async () => {
    try {
      await axios.patch('/api/restore', { id: documentId })
      toast.success('Restored', {
        position: 'bottom-center',
      })
    } catch (error) {
      console.log('Error restoring')
    }
  }
  const onRemove = async () => {
    try {
      await axios.delete(`/api/remove/${documentId}`)
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
