import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState
} from 'react'
import { SlMagnifier } from 'react-icons/sl'
import { useAuthStore } from '../hooks/useAuthStore'
import { db } from '../services/firebase'
import Chats from './Chats'

interface UserProps {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

const Search = () => {
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleKeyEvent = (e: KeyboardEvent) => {
    e.key === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    let currentUserID = currentUser?.uid as string
    let userId = user?.uid as string

    const combinedId =
      currentUserID > userId ? currentUserID + userId : userId + currentUserID

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
    <>
      <div className='mt-4 pb-4 border-b border-b-paragraph/40 relative'>
        <input
          className='p-2 w-full bg-transparent'
          type='text'
          placeholder='Find an user by Name'
          onKeyDown={handleKeyEvent}
          onChange={e => handleOnChange(e)}
          value={userName}
        />
        <button className='absolute right-4 top-3' onClick={handleSearch}>
          <SlMagnifier />
        </button>
      </div>
      {error && <p className='mt-4 pb-4'>User not found</p>}
      {!error && user ? (
        <div
          className='flex gap-x-4 items-center mt-4 pb-4 border-b border-b-paragraph/40 cursor-pointer'
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
      <div className='mt-4 pb-4 xl:h-[calc(100vh_-_286px)] h-[calc(100vh_-_200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-inputBg scrollbar-track-background'>
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
    </>
  )
}

export default Search
