import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ZodError } from 'zod'
import { useAuthStore } from '../hooks/useAuthStore'
import Input from '../components/ui/Input'
import SubmitButton from '../components/ui/SubmitButton'
import { FiAlertCircle } from 'react-icons/fi'
import { loginSchema } from '../schemas/userInput.schemas'

interface FormDataProps {
  email: string
  password: string
}

interface FormErrorsProps {
  email?: string
  password?: string
}

const Login = () => {
  const { signIn, errors, loading } = useAuthStore()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState<FormErrorsProps>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined
    }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      loginSchema.parse(formData)
      // console.log('Form is valid')
      // console.log('Sending ->', formData)
      signIn(formData)
      navigate('/')
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.reduce((prev: any, current: any) => {
          prev[current.path[0]] = current.message
          return prev
        }, {} as FormErrorsProps)
        setFormErrors(errors)
      } else {
        console.error('Something went wrong, try again later')
      }
    }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-background'>
      <div className='container p-8 mx-auto max-w-sm bg-receivedBg rounded-lg flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>Chat App</h1>
        <h1 className='text-2xl'>Register</h1>

        <form
          className='flex flex-col w-full relative mt-6'
          onSubmit={onSubmit}>
          <Input
            type='text'
            placeholder='E-mail Address'
            name={'email'}
            onChange={handleChange}
            error={formErrors.email}
          />
          <Input
            type='password'
            placeholder='Password'
            name={'password'}
            onChange={handleChange}
            error={formErrors.password}
          />
          {errors ? (
            <div className='absolute bottom-12 mt-1 flex items-center gap-2 text-red-500 font-light text-sm'>
              <FiAlertCircle />
              <span>{errors}</span>
            </div>
          ) : null}
          {loading ? (
            <SubmitButton label='Loading' disbale={true} variant='loading' />
          ) : (
            <SubmitButton label='Sign In' variant='submit' />
          )}
        </form>
        <p className='mt-6 flex gap-2'>
          You do have an account?
          <Link
            className='underline underline-offset-4 hover:text-inputBg transition-colors ease-in-out duration-300'
            to={'/register'}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
