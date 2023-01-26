import clsx from 'clsx'

interface ChatBubbleProps {
  intent?: 'sent' | 'received'
  message: string
  caller: string
  uid: number
}

const ChatBubble = ({ intent, ...props }: ChatBubbleProps) => {
  const { caller, message, uid } = props
  if (uid % 2 != 0) {
    intent = 'received'
  } else {
    intent = 'sent'
  }
  return (
    <div
      className={clsx('flex flex-col max-w-[75%] gap-3 mt-6', {
        'self-start': intent === 'received',
        'self-end': intent === 'sent'
      })}>
      <span
        className={clsx({
          'place-self-end': intent === 'sent',
          'place-self-start': intent === 'received'
        })}>
        {caller}
      </span>
      <div
        className={clsx('p-[14px] w-full h-auto', {
          'rounded-t-3xl rounded-bl-3xl bg-sentBg': intent === 'sent',
          'rounded-b-3xl rounded-tr-3xl bg-receivedBg': intent === 'received'
        })}>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ChatBubble
