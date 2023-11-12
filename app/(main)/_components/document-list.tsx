'use client'

import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/spinner'
import { Item } from './item'
import { File, FileIcon, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession, useSessionContext } from '@supabase/auth-helpers-react'

interface DocumentListProps {
  parentDocumentId?: string
  level?: number
  data?: []
}
interface DocumentData {
  id: number
  title: string
  icon:string
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams()
  const router = useRouter()
  const {session}= useSessionContext()
  const [data, setData] = useState<DocumentData[]>([])
  const [loading, setIsLoading] = useState(true)
 
  ///const [expanded, setExpanded] = useState<Record<string, boolean>>({})
//   const onExpand = (documentId: string) => {
//     setExpanded((prevExpanded) => ({
//       ...prevExpanded,
//       [documentId]: !prevExpanded[documentId],
//     }))
//   }
 const routeToDcument=(documentId:number)=>{
  router.push(`/documents/${documentId}`)
 }
 
  const fetchDataFromApi = async () => {
    try {
      const { data: newdata, error } = await supabase
        .from('Document') 
        .select('*')
        .eq("userId",session?.user?.id)
        .eq("isArchived",false)

      if (error) {
        throw error;
      }

      setData(newdata ?? []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    }
  }
  useEffect(() => {
    fetchDataFromApi()
    supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Document',
        },
        (payload) => {
          fetchDataFromApi()
        },
      )
      .subscribe()
  }, [])

  
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="mt-4 p-2 flex flex-col">
           {data.map((document) => (
            <div key={document.id}>
              <Item
                id={document.id}
                label={document.title}
                icon={FileIcon}
                documentIcon={document.icon}
                onClick={()=>routeToDcument(document.id)}
                active={parseInt(params.documentId?.toString(),10) === document.id}
              />
            </div>
          ))}
        </div>
      
      )}
    </div>
  )
}
