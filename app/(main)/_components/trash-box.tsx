import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Spinner } from '@/components/spinner'
import { Input } from '@/components/ui/input'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
import { Search, Trash, Undo } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
interface DocumentData {
  id: number
  title: string
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)
const TrashBox = () => {
  const router = useRouter()
  const params = useParams()
  const [search, setSearch] = useState('')
  const [data, setData] = useState<DocumentData[]>([])
  const [loading, setIsLoading] = useState(true)
  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get('/api/gettrash')
      const newdata = response.data
      setData(newdata)

      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data from the API:', error)
    }
  }

  const filteredData = useMemo(() => {
    return data?.filter((document) => {
      return document.title.toLowerCase().includes(search.toLowerCase())
    })
  }, [data, search])
 
  const onRestore = async(id:number) => {
    try {
        await axios.patch("/api/restore",{id:id})
        toast.success("Restored",{
          position:"bottom-center"
        })
        
    } catch (error) {
        console.log("Error restoring")
        
    }
  }
  const onRemove = async(id:number) => {
    try {
        await axios.delete(`/api/remove/${id}`)
        toast.success("Deleted",{
          position:"bottom-center"
        })
        
    } catch (error) {
        console.log("Error Deleting")
        
       
        
    }
  }
  const routetopage=(documentId:number)=>{
    router.push(`/documents/${documentId}`)
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
  if (loading) {
    return <div></div>
  }
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No document found
        </p>
        {loading ? (
          <Spinner />
        ) : (
          filteredData?.map((document) => {
            return (
              <div
                key={document.id}
                role="button"
                onClick={()=>routetopage(document.id)}
                className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
              >
                <span>{document.title}</span>
                <div className="flex items-center">
                  <div
                    onClick={() => onRestore(document.id)}
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200"
                  >
                    <Undo className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <ConfirmModal onConfirm={() => onRemove(document.id)}>

                  
                  <div
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </div>
                  </ConfirmModal>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default TrashBox
