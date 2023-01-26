import ChatBubble from './ChatBubble'
import data from './../data/mocked.json'
import Header from './Header'
import InputMessage from './InputMessage'

const ChatWindow = ({
  handleSidebarToggle
}: {
  handleSidebarToggle: () => void
}) => {
  // const array = new Array(10).fill('')

  return (
    <div className='flex flex-col flex-2 w-full'>
      <Header handleSidebarToggle={handleSidebarToggle} />
      <div className='h-[calc(100vh_-_180px)] pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-inputBg scrollbar-track-background flex flex-col'>
        {data.conversa.map(item => (
          <ChatBubble key={item.uid} {...item} />
        ))}
      </div>
      <InputMessage />
    </div>
  )
}

export default ChatWindow
