import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuthStore = () => {
  const { signIn, signUp, errors, loading, currentUser, logout } =
    useContext(AuthContext)

  return {
    signIn,
    signUp,
    errors,
    loading,
    currentUser,
    logout
  }
}
