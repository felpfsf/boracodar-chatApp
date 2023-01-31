// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBAE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBAE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBAE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_NAME,
  messagingSenderId: import.meta.env.VITE_FIREBAE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBAE_APPID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app, 'gs://chatapp-8c815.appspot.com')
// const storage = getStorage(app)

export { db, auth, storage }
