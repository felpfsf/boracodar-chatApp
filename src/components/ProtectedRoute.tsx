import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'
import Login from '../pages/Login'

const ProtectedRoute = ({ element, ...rest }: { element: JSX.Element }) => {
  const { currentUser } = useAuthStore()
  // console.log(currentUser)

  return (
    <Routes {...rest}>
      {!currentUser ? (
        <Route path='*' element={<Login />} />
      ) : (
        <Route path='/*' element={element} />
      )}
    </Routes>
  )
}

export default ProtectedRoute
