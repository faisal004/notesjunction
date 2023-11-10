'use client'

import { Spinner } from '@/components/spinner'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation'
import Navigation from './_components/navigation'
import { SearchCommand } from '@/components/search-command'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useSessionContext()
  if (isLoading) {
    return (
      <div className="items-center flex justify-center h-full">
        <Spinner size="lg" />
      </div>
    )
  }

  if (session === null) {
    return redirect('/')
  }
  return <div className='h-full flex dark:bg-[#1F1F1F]'>
    <Navigation/>
    <main className='flex-1 h-full overflow-y-auto'>
      <SearchCommand/>
    {children}
    </main>
    </div>
}

export default MainLayout
