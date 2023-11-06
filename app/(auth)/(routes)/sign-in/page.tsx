'use client'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'



const LoginPage = () => {
  const { session,isLoading } = useSessionContext()
  const supabase = useSupabaseClient()
  const router = useRouter()
  useEffect(() => {
    if (session) {
      router.refresh()
      router.push("/")
    }
  }, [session])
  return (
    <div className='bg-gray-900 p-10 rounded-xl'>
      <Auth
        theme="dark"
        providers={['google']}
        magicLink
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
        }}
      />
    </div>
  )
}

export default LoginPage
