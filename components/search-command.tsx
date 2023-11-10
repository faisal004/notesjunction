'use client'
import { useEffect, useState } from 'react'
import { File } from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useSearch } from '@/hooks/use-search'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
interface DocumentData {
  id: number
  title: string
  icon: string
}
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  
export const SearchCommand = () => {
  const [isMounted, setIsMounted] = useState(false)
  const toggle = useSearch((store) => store.toggle)
  const isOpen = useSearch((store) => store.isOpen)
  const onClose = useSearch((store) => store.onClose)
  const [data, setData] = useState<DocumentData[]>([])
  const router = useRouter()

  const documentsfromAPI = async () => {
    try {
      const req = await axios.get('/api/getdocuments')
      const newData = req.data
      
      setData(newData)
    
    } catch (error) {
      console.log('Error fetch data')
    }
  }
  const onSelect = (id: number) => {
    router.push(`/documents/${id}`)
    onClose()
  }
useEffect(()=>{
    documentsfromAPI()
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
        documentsfromAPI()
      },
    )
    .subscribe()
},[])
  useEffect(() => {
    setIsMounted(true)
    
  }, [])
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [toggle])
  console.log(data)

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {data?.map((document) => (
            <CommandItem
              key={document.id}
              value={`${document.id}-${document.title}`}
              title={document.title}
              onSelect={() => onSelect(document.id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
