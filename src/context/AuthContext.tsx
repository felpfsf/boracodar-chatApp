import { createContext, ReactNode, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from 'firebase/auth'
import { db, auth, storage } from '../services/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import {
  LoginInputProps,
  RegisterInputProps
} from '../schemas/userInput.schemas'

interface AuthContextProps {
  currentUser: User | null
  errors: null | string
  loading: boolean
  signUp: (data: RegisterInputProps) => Promise<void>
  signIn: (data: LoginInputProps) => Promise<void>
  // signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  errors: null,
  loading: false,
  signUp: async () => {},
  signIn: async () => {},
  // signInWithGoogle: async () => {},
  logout: async () => {}
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const checkIfIsCancelled = () => {
    if (cancelled) return
  }

  // Create User
  const signUp = async ({
    displayName,
    email,
    password,
    photoURL
  }: RegisterInputProps) => {
    console.log('receiving ->', displayName, email, password, photoURL)
    checkIfIsCancelled()
    setLoading(true)
    setErrors('')
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const date = new Date().getTime()
      const storageRef = ref(storage, `images/${date + displayName}`)
      await uploadBytesResumable(storageRef, photoURL).then(() => {
        getDownloadURL(storageRef).then(async downloadURL => {
          try {
            await updateProfile(user, {
              displayName: displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              email,
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, 'userCharts', user.uid), {})
          } catch (error) {
            console.log(error)
          }
        })
      })
    } catch (error) {
      console.log(error)
      let sysErrorMessage
      if (error instanceof Error && error.message.includes('email-already')) {
        sysErrorMessage = 'E-mail already in use'
      } else {
        sysErrorMessage = 'Something went wrong, try again later'
      }
      setErrors(sysErrorMessage)
    }

    setLoading(false)
  }

  const signIn = async ({ email, password }: LoginInputProps) => {
    checkIfIsCancelled()
    setLoading(true)
    setErrors('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      let sysErrorMessage
      if (error instanceof Error && error.message.includes('user-not-found')) {
        sysErrorMessage = 'User not found'
        console.log(sysErrorMessage)
      } else if (
        error instanceof Error &&
        error.message.includes('wrong-password')
      ) {
        sysErrorMessage = 'Wrong password'
        console.log(sysErrorMessage)
      } else {
        sysErrorMessage = 'Something went wrong, try again later'
        console.log(sysErrorMessage)
      }
      setErrors(sysErrorMessage)
    }
    setLoading(false)
  }

  const signInWithGoogle = () => {}

  const logout = async () => {
    checkIfIsCancelled()
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, logout, errors, currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
