export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Document: {
        Row: {
          content: string | null
          coverImage: string | null
          icon: string | null
          id: number
          isArchived: boolean
          isPublished: boolean
          parentDocumentId: number | null
          title: string
          userId: string
        }
        Insert: {
          content?: string | null
          coverImage?: string | null
          icon?: string | null
          id?: number
          isArchived: boolean
          isPublished: boolean
          parentDocumentId?: number | null
          title: string
          userId: string
        }
        Update: {
          content?: string | null
          coverImage?: string | null
          icon?: string | null
          id?: number
          isArchived?: boolean
          isPublished?: boolean
          parentDocumentId?: number | null
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Document_parentDocumentId_fkey"
            columns: ["parentDocumentId"]
            isOneToOne: false
            referencedRelation: "Document"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
