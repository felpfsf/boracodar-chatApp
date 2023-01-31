import { VscCircleFilled } from 'react-icons/vsc'

interface ChatsProps {
  // uid: number
  displayName: string
  lastMessage: string
  photoURL: string
}

const Chats = ({ displayName, lastMessage, photoURL }: ChatsProps) => {
  return (
    <div className='flex gap-x-4 items-center mt-4 cursor-pointer'>
      <div className='w-12 h-12 rounded-full overflow-hidden'>
        <img src={photoURL} alt='' className='w-full h-full object-cover' />
      </div>
      <div>
        <h2 className='font-bold'>{displayName}</h2>
        <p className='text-xs flex items-center text-paragraph/40'>
          {lastMessage}
        </p>
      </div>
    </div>
  )
}

export default Chats
