import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Layout from './components/hand/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ActivityTypes from './modules/activityTypes/index.tsx';
import Parents from './modules/parents/index.tsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <h1>Home</h1>,
  },
  {
    path: "/activityTypes",
    element: <ActivityTypes />,
  },
  {
    path: "/parents",
    element: <Parents />,
  }

]);

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </QueryClientProvider>
  </StrictMode>,
)
