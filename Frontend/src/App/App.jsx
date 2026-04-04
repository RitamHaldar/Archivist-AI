import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { useAuth } from '../Features/Auth/Hooks/useAuth'
import { useEffect } from 'react'
const App = () => {
  const { handleGetMe } = useAuth()
  useEffect(() => {
    handleGetMe()
  }, [])
  return (
    <RouterProvider router={router} />
  )
}

export default App
