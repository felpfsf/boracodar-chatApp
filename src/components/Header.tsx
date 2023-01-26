import { VscArrowLeft, VscCircleFilled, VscClose } from 'react-icons/vsc'

interface HeaderProps {
  // handleCloseConversation: () => void
  handleSidebarToggle: () => void
}

const Header = ({ handleSidebarToggle }: HeaderProps) => {
  return (
    <div className='flex items-center justify-between mb-6'>
      {/* Perfil */}
      <div className='flex gap-x-4 items-center justify-center'>
        <button onClick={handleSidebarToggle} className='flex-shrink xl:hidden'>
          <VscArrowLeft />
        </button>
        <div className='w-12 h-12 rounded-full overflow-hidden'>
          <img
            src='/images/avatar.png'
            alt=''
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <h2 className='font-bold'>Cecília Sassaki</h2>
          <p className='text-xs flex items-center text-status'>
            <VscCircleFilled className='w-4 h-4' />
            Online
          </p>
        </div>
      </div>
      {/* fechar conversa */}
      <button className='w-6 h-6'>
        <VscClose className='w-full h-full' />
      </button>
    </div>
  )
}

export default Header
