'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { ChevronsLeftRight } from 'lucide-react'
import toast from 'react-hot-toast'
const UserItem = () => {
  const { session } = useSessionContext()
  const supabase = useSupabaseClient()
  const handleLogout = async () => {
    const {error}=await supabase.auth.signOut()
    if(error){
      toast.error("Something went wrong")
    }else{
      toast.success("Byeee")
    }
  }

  return (
    <DropdownMenu>
      {' '}
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {session?.user?.user_metadata?.name}&apos;s Notes
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 "
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2 ">
          <p className="tezt-xs font-medium text-muted-foreground leading-none">
            {session?.user?.user_metadata?.email}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {session?.user?.user_metadata?.name}&apos;s Notes
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer hover:bg-gray-700" onClick={handleLogout}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserItem
