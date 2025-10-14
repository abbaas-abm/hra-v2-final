import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import { HeadContent } from '@tanstack/react-router'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
import AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react'
import {Toaster} from 'sonner'
type RouterContext = {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => Root(),
})

function Root () {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (ms)
      easing: "ease-in-out", // Easing option
      once: false, // Whether animation should happen only once
      mirror: false, // Animate again on scroll up
    });
  }, []);

  return (
    <>
    <HeadContent/>
      <Outlet />
      <Toaster/>
      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}