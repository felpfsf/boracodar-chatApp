import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import { FcAddImage } from 'react-icons/fc'
import { FiAlertCircle } from 'react-icons/fi'

const InputType = ['file', 'password', 'text', 'email'] as const

type TInputTypes = typeof InputType[number]

interface InputProps {
  label?: string
  type: TInputTypes
  placeholder?: string
  name: string
}

const Input = ({ type, label, placeholder, name }: InputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const [fileName, setFileName] = useState('')

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className='mb-8 relative'>
      {type === 'file' ? (
        <>
          <label
            htmlFor='photoURL'
            className='w-full flex items-end gap-x-4 cursor-pointer'>
            <FcAddImage className='w-14 h-14' />
            <span className='text-paragraph'>
              {fileName ? fileName : 'Add an avatar'}
            </span>
          </label>
        </>
      ) : (
        <label>{label}</label>
      )}
      <input
        {...register(name)}
        name={name}
        type={type}
        id={name}
        // onChange={handleChangeInput}
        className={clsx(
          {
            'w-full px-1 block bg-transparent border-0 border-b-2 border-violet-800 mt-0 focus:ring-0 focus:border-b-violet-500 transition-colors duration-300 ease-in-out placeholder:text-paragraph/50 outline-none':
              type != 'file'
          },
          { hidden: type === 'file' }
        )}
        placeholder={placeholder}
        accept='image/png, image/jpeg, image/jpg'
      />
      {errors[name]?.message && (
        <div className='absolute mt-1 flex items-center gap-2 text-red-500 font-light text-sm'>
          <FiAlertCircle />
          <span>{errors[name]?.message as string}</span>
        </div>
      )}
    </div>
  )
}

export default Input
