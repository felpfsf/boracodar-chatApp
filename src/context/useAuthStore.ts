import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useAuthStore = () => {
  const { signIn, signUp, errors, loading } = useContext(AuthContext)
  return {
    signIn,
    signUp,
    errors,
    loading
  }
}
