'use client'

import { Cover } from '@/components/cover'
import Editor from '@/components/editor'
import { Spinner } from '@/components/spinner'
import Toolbar from '@/components/toolbar'
import { useDebounce } from '@/hooks/use-debounce'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
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
  const [content, setContent] = useState<string | undefined>(data?.content);
  const debouncedContent = useDebounce(content, 500); 
  const fetchData = async () => {
    try {
      const req = await axios.get(`/api/getPublished/${params.documentId}`)
      const newData = req.data
      setData(newData)
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
 
  if(data===null){
    return <div className=' items-center flex justify-center h-full'>
        This page was Unpublished by Owner
    </div>
 }
  return (
    <>
      {loading ? (
       <div className=' items-center flex justify-center h-full'><Spinner size="lg"/></div>
      ) : (
        <div className="pb-40">
          <Cover preview url={data?.coverImage}/>
          <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
            <Toolbar preview initialData={data} />
            <Editor
            editable={false}
            onChange={()=>{}}
            initialContent={data?.content}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DocumentPage
