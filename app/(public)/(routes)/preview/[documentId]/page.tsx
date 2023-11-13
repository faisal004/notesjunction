'use client'

import { Cover } from '@/components/cover'
import Editor from '@/components/editor'
import { Spinner } from '@/components/spinner'
import Toolbar from '@/components/toolbar'
import { useDebounce } from '@/hooks/use-debounce'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface DocumentIdPageProps {
  params: {
    documentId: number
  }
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const DocumentPage = ({ params }: DocumentIdPageProps) => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<string | undefined>(data?.content)
  
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('Document')
        .select('*')
        .eq('id', params.documentId)
        .eq('isPublished', true)
        .eq('isArchived', false)
      if (error) {
        throw error
      }
      setData(data ?? [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    const subscription = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Document',
        },
        (payload) => {
          fetchData()
        },
      )
      .subscribe()
    return () => {
      subscription.unsubscribe()
    }
  }, [params.documentId])

  if (!data || data.length === 0) {
    return (
      <div className=" items-center flex flex-col justify-center h-full text-center">
        <p>This page was Unpublished by Owner </p>
        <Link href={'https://notesjunction.vercel.app'}>
          <p className="hover:underline cursor-pointer">
            Go to NotesJunction and Create and publish your own note
          </p>
        </Link>
      </div>
    )
  }
  return (
    <>
      {loading ? (
        <div className=" items-center flex justify-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="pb-40">
          <Cover preview url={data[0]?.coverImage} />
          <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
            <Toolbar preview initialData={data[0]} />
            <Editor
              editable={false}
              onChange={() => {}}
              initialContent={data[0]?.content}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DocumentPage
