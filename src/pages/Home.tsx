import { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import Sidebar from '../components/Sidebar'

const Home = () => {
  // Fechar conversa
  const [isEnabled, setIsEnabled] = useState(true)

  const handleCloseConversation = () => {
    setIsEnabled(prev => !prev)
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className='w-full h-screen flex flex-col bg-background'>
      <div className='w-full px-8 xl:px-2 pt-6'>
        <main className='flex flex-1'>
          <Sidebar isOpen={isSidebarOpen} toggle={handleSidebarToggle} />
          {/* mensagens */}
          <ChatWindow handleSidebarToggle={handleSidebarToggle} />
        </main>
      </div>
    </div>
  )
}

export default Home
