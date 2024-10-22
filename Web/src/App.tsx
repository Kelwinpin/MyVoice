import './App.css'
import Register from './modules/register'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Register />
    </QueryClientProvider>
  )
}

export default App
