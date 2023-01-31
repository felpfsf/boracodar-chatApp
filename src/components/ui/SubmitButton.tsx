import clsx from 'clsx'
import { CgSpinner } from 'react-icons/cg'

const ButtonType = ['submit', 'loading'] as const

type TButtonType = typeof ButtonType[number]

interface ButtonProps {
  disbale?: boolean
  variant: TButtonType
  label: string
}

const SubmitButton = ({ disbale, label, variant }: ButtonProps) => {
  return (
    <button
      className={clsx(
        {
          'w-full border border-violet-500 py-2 bg-inputBg rounded-full mt-2 flex items-center justify-center gap-4':
            label != 'loading'
        },
        { 'cursor-not-allowed': variant === 'loading' && disbale }
      )}
      disabled={disbale}>
      {variant === 'loading' ? (
        <CgSpinner className='w-5 h-5 animate-spin' />
      ) : null}
      {label}
    </button>
  )
}

export default SubmitButton
