"use client"
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const router=useRouter()
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F] ">
      <div className="hidden md:flex items-center gap-x-2 text-xl font-bold hover:underline cursor-pointer">
        NotesJunction
      </div>
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
      <Link href={"https://github.com/faisal004/notesjunction"} target='_blank'>
        <Button variant="ghost" size="sm">
          <Github/>
        </Button>
        </Link>
        <Link href={"/privacypolicy"}>
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        </Link>
        <Link href={"/terms"}>
        
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
        </Link>
      </div>
    </div>
  )
}

export default Footer
