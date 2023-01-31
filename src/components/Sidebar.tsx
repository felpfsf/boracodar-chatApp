import { VscArrowLeft, VscCircleFilled, VscClose } from 'react-icons/vsc'
import { SlMagnifier } from 'react-icons/sl'
import Chats from './Chats'
import data from './../data/mocked.json'
import SidebarHeader from './SidebarHeader'
import { KeyboardEvent, useEffect, useState } from 'react'
import { db } from '../services/firebase'
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { useAuthStore } from '../context/useAuthStore'

interface SidebarToggleProps {
  isOpen: boolean
  toggle: () => void
}

interface UserProps {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

const Sidebar = ({ isOpen, toggle }: SidebarToggleProps) => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState<UserProps | DocumentData | null>(null)
  const [error, setError] = useState(false)
  const { currentUser } = useAuthStore()

  const handleSearch = async () => {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('displayName', '==', userName))

    const querySnapshot = await getDocs(q)
    // console.log(querySnapshot.empty)
    if (!querySnapshot.empty) {
      querySnapshot.forEach(doc => {
        setUser(doc.data())
      })
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleKeyEvent = (e: KeyboardEvent) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    console.log('hehee')
    let currentUserID = currentUser?.uid as string
    let userId = user?.uid as string

    const combinedId =
      currentUserID > userId ? currentUserID + userId : userId + currentUserID

    console.log(combinedId)

    try {
      const res = await getDoc(doc(db, 'chats', combinedId))
      console.log(res.exists())
      // Compare if the chat doesn't exists then create one
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        await updateDoc(doc(db, 'userChats', currentUserID), {
          [combinedId + '.userInfo']: {
            uid: userId,
            displayName: user?.displayName,
            photoURL: user?.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChats', userId), {
          [combinedId + '.userInfo']: {
            uid: currentUserID,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        })
      }
    } catch (error) {}

    setUser(null)
    setUserName('')
  }

  const [chats, setChats] = useState<DocumentData[] | null>([])
  const currentUserID = currentUser?.uid as string

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUserID), doc => {
        setChats(doc.data() as DocumentData[])
      })
      return () => {
        unsub()
      }
    }
    currentUserID && getChats()
  }, [currentUserID])

  return (
    <div
      className={`bg-background fixed xl:static xl:h-full xl:flex-1 xl:pr-2 min-w-[360px] top-0 h-screen w-full z-10 ${
        isOpen
          ? 'left-0  ease-in-out duration-300'
          : '-left-full ease-in-out duration-200'
      }`}>
      <div className='w-full px-8 xl:px-4 pt-6 relative'>
        {/* Sidebar header */}
        <SidebarHeader />
        {/* fechar sidebar */}
        <button
          className='w-6 h-6 absolute top-9 left-8 xl:hidden'
          onClick={toggle}>
          <VscClose className='w-full h-full' />
        </button>
        {/* Search */}
        <div className='mt-4 pb-4 border-b border-b-paragraph/40 relative'>
          <input
            className='p-2 w-full bg-transparent'
            type='text'
            placeholder='Encontre um usuário'
            onKeyDown={handleKeyEvent}
            onChange={e => setUserName(e.target.value)}
            value={userName}
          />
          <button className='absolute right-4 top-3'>
            <SlMagnifier />
          </button>
        </div>
        <div className='mt-4 pb-4 xl:h-[calc(100vh_-_286px)] h-[calc(100vh_-_200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-inputBg scrollbar-track-background'>
          {error && <span>User not found</span>}
          {user ? (
            <div
              className='flex gap-x-4 items-center pb-4 border-b border-b-paragraph/40 cursor-pointer'
              onClick={handleSelect}>
              <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img
                  src={user.photoURL}
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <h2 className='font-bold'>{user.displayName}</h2>
              </div>
            </div>
          ) : null}
          {/* {data.chats.map(chat => (
            <Chats key={chat.uid} {...chat} />
          ))} */}
          {chats &&
            Object.entries(chats)?.map(chat => (
              <Chats
                key={chat[0]}
                displayName={chat[1].userInfo.displayName}
                lastMessage={chat[1].userInfo.lastMessage}
                photoURL={chat[1].userInfo.photoURL}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
