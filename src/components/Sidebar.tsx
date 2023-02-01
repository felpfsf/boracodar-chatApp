import { VscClose } from 'react-icons/vsc'

import SidebarHeader from './SidebarHeader'
import Search from './Search'

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
        {/* Search */}
        <Search />
        {/* End Search */}
        </div>
      </div>
  )
}

export default Sidebar
