import { SignUp } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/(auth)/sign-up/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex items-center justify-center flex-col w-full p-5">
    <SignUp/>
  </div>
}
