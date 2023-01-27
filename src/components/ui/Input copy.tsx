import clsx from 'clsx'
import { FieldValues, UseFormRegister } from 'react-hook-form/dist/types'
import {Controller, useController} from 'react-hook-form'
import { FcAddImage } from 'react-icons/fc'
import { FiAlertCircle } from 'react-icons/fi'

const InputType = ['file', 'password', 'text', 'email'] as const

type TInputTypes = typeof InputType[number]

interface InputProps {
  label?: string
  type: TInputTypes
  placeholder?: string
  // register?: Controller<unknown> /*UseFormRegister<FieldValues>*/
  name: string
}

const Input = ({ type, label, placeholder }: InputProps) => {
  return (
    <div className='mb-6 relative'>
      {type === 'file' ? (
        <>
          <label
            htmlFor='file'
            className='w-full flex items-end gap-x-4 cursor-pointer'>
            <FcAddImage className='w-14 h-14' />
            <span className='text-paragraph'>Add an avatar</span>
          </label>
        </>
      ) : (
        <label>{label}</label>
      )}
      <input
        type={type}
        className={clsx(
          {
            'w-full px-1 block bg-transparent border-0 border-b-2 border-indigo-800 mt-0 focus:ring-0 focus:border-b-indigo-500 transition-colors duration-300 ease-in-out placeholder:text-paragraph/50':
              type != 'file'
          },
          { hidden: type === 'file' }
        )}
        placeholder={placeholder}
      />
      <div className='absolute flex items-center gap-2 text-red-500 font-semibold text-sm'>
        <FiAlertCircle />
        <span>error</span>
      </div>
    </div>
  )
}

export default Input
