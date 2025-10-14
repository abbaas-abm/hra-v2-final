import { SignIn } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/(auth)/sign-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='p-5 flex items-center flex-col'>
    <SignIn/>
  </div>
}
