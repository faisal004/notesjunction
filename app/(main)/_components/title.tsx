'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
interface TitleProps {
  initialData: {
    title:string ,
    icon:string

  }
  
}

const Title = ({ initialData }: TitleProps) => {
  const params = useParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialData?.title || 'Untitled')
  const enableInput = () => {
    setTitle(initialData?.title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const disableInput = () => {
    setIsEditing(false)
    if (params.documentId) {
      axios
        .patch(`/api/getdocuments/${params.documentId}/updatetitle`, { title })
        .then((response) => {
          console.log('Title updated successfully:', response.data)
        })
        .catch((error) => {
          console.error('Error updating title:', error)
        })
    }
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)

   
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      disableInput()
    }
  }
  useEffect(() => {
    if (!params.documentId) {
      console.error('Document ID is not defined')
      return
    }
  }, [params.documentId])

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData?.icon && <p>{initialData?.icon}</p>}
      {isEditing ? (
        <Input
          value={title}
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          value={title}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  )
}

export default Title
