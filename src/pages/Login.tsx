import Input from '../components/ui/Input'
import { Link } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const loginSchema = z.object({
  email: z.string().email().min(1, 'Email is required').optional(),
  password: z.string().min(6, 'Password is required').optional()
})

export type LoginInputProps = z.infer<typeof loginSchema>

const Login = () => {
  const methods = useForm<LoginInputProps>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data: LoginInputProps) => {
    console.log(data)
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-background'>
      <div className='container p-8 mx-auto max-w-sm bg-receivedBg rounded-lg flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>Chat App</h1>
        <h1 className='text-2xl'>Sign In</h1>
        <FormProvider {...methods}>
          <form
            className='flex flex-col w-full'
            onSubmit={methods.handleSubmit(onSubmit)}>
            <Input type='text' placeholder='E-mail Address' name={'email'} />
            <Input type='password' placeholder='password' name={'password'} />
            <button className='w-full border py-2 bg-inputBg rounded-full mt-2'>
              Sign up
            </button>
          </form>
        </FormProvider>
        <p className='mt-6'>
          You don't have an account yet?{' '}
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
