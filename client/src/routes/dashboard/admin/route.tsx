import AdminLogoutButton from '@/components/AdminLogoutButton'
import AdminPanelNavigation from '@/components/AdminPanelNavigation'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/dashboard/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const {admin} = useAdminAuth()
  const navigate = useNavigate();

  useEffect(()=> {
    if (!admin) {
      navigate({to: '/hra-admin'})
    }
  })

  return <main className='flex'>
    <AdminPanelNavigation/>
    <div className='ml-15 md:ml-70'>
        <Outlet/>
        <AdminLogoutButton/>
    </div>
  </main>
}
