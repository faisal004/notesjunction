'use client'

import { ImageIcon, Smile, X } from 'lucide-react'
import { IconPicker } from './icon-picker'
import { Button } from './ui/button'
import { ElementRef, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import TextareaAutosize from 'react-textarea-autosize'
import toast from 'react-hot-toast'

interface ToolbarProps {
  initialData: {
    id: number
    title: string
    icon: string
    coverImage: string
  }
  preview?: boolean
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<'textarea'>>(null)
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData?.title)
  const enableInput = () => {
    if (preview) return
    setIsEditing(true)
    setTimeout(() => {
      setValue(initialData.title)
      inputRef.current?.focus()
    }, 0)
  }
  const disableInput = () => {
    setIsEditing(false)
    console.log('Updated title:', value)
    console.log('Document ID:', params.documentId)
    if (params.documentId) {
      axios
        .patch(`/api/getdocuments/${params.documentId}/updatetitle`, {
          title: value,
        })
        .then((response) => {
          console.log('Title updated successfully:', response.data)
        })
        .catch((error) => {
          console.error('Error updating title:', error)
        })
    }
  }
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      disableInput()
    }
  }

  const onIconSelect = async (icon: string) => {
    try {
     
      axios.patch(`/api/getdocuments/${params.documentId}/addicon`, { icon })
      toast.success("Icon Updated",{
        position:"bottom-center"
      })
    } catch (error) {
      console.log('Error updating icon')
    }
  }
  const onIconRemove = async (icon: string) => {
    try {
      
      axios.patch(`/api/getdocuments/${params.documentId}/removeicon`, { icon })
      toast.success("Icon Removed",{
        position:"bottom-center"
      })
    } catch (error) {
      console.log('Error updating icon')
    }
  }
  useEffect(() => {
    if (!params.documentId) {
      console.error('Document ID is not defined')
      return
    }
  }, [params.documentId])
  return (
    <div className="pl-[54px] group relative">
      {!!initialData?.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData?.icon}
            </p>
          </IconPicker>
          <Button
            onClick={()=>onIconRemove(initialData?.icon)}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData?.icon && preview && (
        <p className="text-6xl pt-6">{initialData?.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData?.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData?.coverImage && !preview && (
          <Button
            onClick={() => {}}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData?.title}
        </div>
      )}
    </div>
  )
}

export default Toolbar
