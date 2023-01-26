import { IoSend } from 'react-icons/io5'

const InputMessage = () => {
  return (
    <div className='flex items-center justify-between py-4 relative'>
      <textarea
        className='w-full resize-none px-6 pt-4 leading-none bg-inputBg outline-none rounded-3xl'
        placeholder='Digite sua mensagem'></textarea>
      <button className='absolute right-6 w-6 h-6' type='submit'>
        <IoSend className='w-full h-full' />
      </button>
    </div>
  )
}

export default InputMessage
