import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Layout from './components/hand/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ActivityTypes from './modules/register/activityTypes/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/activityTypes/register",
    element: <ActivityTypes />,
  },
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
