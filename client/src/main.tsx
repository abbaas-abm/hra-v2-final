import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { ClerkProvider } from '@clerk/clerk-react';
import DriverProvider from './context/DriverAuthContext.tsx';
import AdminProvider from './context/AdminAuthContext.tsx';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {queryClient},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={`/`} afterSignInUrl={'/dashboard/user'}>
     <AdminProvider>
      <DriverProvider>
        <QueryClientProvider client={queryClient}>
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>
        </QueryClientProvider>
      </DriverProvider>
    </AdminProvider>
    </ClerkProvider>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
