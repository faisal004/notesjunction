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
import toast from 'react-hot-toast'
import { createClient } from '@supabase/supabase-js'

interface MenuProps {
  documentId: number
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter()

  const onArchive = async () => {
    try {
      const { error } = await supabase
        .from('Document')
        .update({ isArchived: true })
        .eq('id', documentId)

      if (error) {
        throw error
      }
      toast.success('Archived', {
        position: 'bottom-center',
      })
    } catch (error:any) {
      console.error('Error restoring:', error.message)
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
