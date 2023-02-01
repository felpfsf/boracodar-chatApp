import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ZodError } from 'zod'
import { useAuthStore } from '../hooks/useAuthStore'
import Input from '../components/ui/Input'
import SubmitButton from '../components/ui/SubmitButton'
import { FiAlertCircle } from 'react-icons/fi'
import { registerSchema } from '../schemas/userInput.schemas'

interface FormDataProps {
  displayName: string
  email: string
  password: string
  photoURL: File | null
}

interface FormErrorsProps {
  displayName?: string
  email?: string
  password?: string
  photoURL?: string
}

const Register = () => {
  const { signUp, errors, loading } = useAuthStore()
  const [formData, setFormData] = useState<FormDataProps>({
    displayName: '',
    email: '',
    password: '',
    photoURL: null
  })
  const [formErrors, setFormErrors] = useState<FormErrorsProps>({})
  const navigate = useNavigate()

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

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData(prevFormData => ({
      ...prevFormData,
      photoURL: file
    }))
    setFormErrors(prevErrors => ({
      ...prevErrors,
      image: undefined
    }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      registerSchema.parse(formData)
      setFormErrors({})
      // console.log('Form is valid')
      // console.log('sending ->', formData)
      await signUp(formData)
      navigate('/')
    } catch (error) {
      if (error instanceof ZodError) {
        // console.log('Validation error')
        const errors = error.errors.reduce((prev: any, current: any) => {
          prev[current.path[0]] = current.message
          return prev
        }, {} as FormErrorsProps)
        setFormErrors(errors)
      } else {
        console.log('Something went wrong, try again later')
      }
    }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-background'>
      <div className='container p-8 mx-auto max-w-sm bg-receivedBg rounded-lg flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>Chat App</h1>
        <h1 className='text-2xl'>Register</h1>

        <form
          className='flex flex-col w-full mt-6 relative'
          onSubmit={onSubmit}>
          <Input
            type='text'
            placeholder='Name'
            name={'displayName'}
            onChange={handleChange}
            error={formErrors.displayName}
          />
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
          <Input
            type='file'
            name={'photoURL'}
            onChange={handleFileInput}
            error={formErrors.photoURL}
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
            <SubmitButton label='Sign Up' variant='submit' />
          )}
        </form>
        <p className='mt-6 flex gap-2'>
          You do have an account?
          <Link
            className='underline underline-offset-4 hover:text-inputBg transition-colors ease-in-out duration-300'
            to={'/login'}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
