import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<main>
    <Navbar/>
    <Outlet/>
    <Footer/>
  </main>)
}
