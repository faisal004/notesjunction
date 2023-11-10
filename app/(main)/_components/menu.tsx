'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'

import { MoreHorizontal, Trash } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import toast from 'react-hot-toast'

interface MenuProps {
  documentId: number
}

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter()

  const onArchive = async () => {
    try {
      await axios.patch('/api/archive', { id: documentId })
      toast.success('Archived', {
        position: 'bottom-center',
      })
    } catch (error) {
      console.log('Error Archiving')
    }

    router.push('/documents')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />
}
