import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <SignIn />
    </div>
  )
}
