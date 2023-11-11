'use client'

import { Cover } from '@/components/cover'
import Toolbar from '@/components/toolbar'
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
  console.log(params.documentId)
  const fetchData = async () => {
    try {
      const req = await axios.get(`/api/getdocuments/${params.documentId}`)
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
  console.log(data)
  return (
    <>
      {loading ? (
        'Loading'
      ) : (
        <div className="pb-40">
          <Cover url={data?.coverImage}/>
          <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
            <Toolbar initialData={data} />
          </div>
        </div>
      )}
    </>
  )
}

export default DocumentPage
