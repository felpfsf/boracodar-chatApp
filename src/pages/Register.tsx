import Input from '../components/ui/Input'
import { Link } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const registerSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(6, 'Password is required'),
  photoURL: z.any().nullable().optional()
  // photoURL: z.object({
  //   name: z.string(),
  //   size: z.number(),
  //   type: z.string()
  // })
})

export type RegisterInputProps = z.infer<typeof registerSchema>

const Register = () => {
  const methods = useForm<RegisterInputProps>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = (data: RegisterInputProps) => {
    console.log(data)
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-background'>
      <div className='container p-8 mx-auto max-w-sm bg-receivedBg rounded-lg flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>Chat App</h1>
        <h1 className='text-2xl'>Register</h1>
        <FormProvider {...methods}>
          <form
            className='flex flex-col w-full'
            onSubmit={methods.handleSubmit(onSubmit)}>
            <Input type='text' placeholder='Name' name={'name'} />
            <Input type='text' placeholder='E-mail Address' name={'email'} />
            <Input type='password' placeholder='password' name={'password'} />
            <Input type='file' name={'photoURL'} />
            <button className='w-full border py-2 bg-inputBg rounded-full mt-2'>
              Sign up
            </button>
          </form>
        </FormProvider>
        <p className='mt-6'>
          You do have an account?{' '}
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
