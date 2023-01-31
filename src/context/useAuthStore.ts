import { useContext } from 'react'
import { AuthContext } from './AuthContext'

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
