import { VscArrowLeft, VscCircleFilled, VscClose } from 'react-icons/vsc'
import { SlMagnifier } from 'react-icons/sl'
import Chats from './Chats'
import data from './../data/mocked.json'
import SidebarHeader from './SidebarHeader'

interface SidebarToggleProps {
  isOpen: boolean
  toggle: () => void
}

const Sidebar = ({ isOpen, toggle }: SidebarToggleProps) => {
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
        <div className='mt-4 pb-4 border-b border-b-paragraph/40 relative'>
          <input
            className='p-2 w-full bg-transparent'
            type='text'
            placeholder='Encontre um usuário'
          />
          <button className='absolute right-4 top-3'>
            <SlMagnifier />
          </button>
        </div>
        <div className='mt-4 pb-4 xl:h-[calc(100vh_-_286px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-inputBg scrollbar-track-background'>
          {data.chats.map(chat => (
            <Chats key={chat.uid} {...chat} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
