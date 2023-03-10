import Input from '../components/ui/Input'
import { Link } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import SubmitButton from '../components/ui/SubmitButton'
import { useAuthStore } from '../context/useAuthStore'


export const registerSchema = z.object({
  displayName: z.string().min(3, 'Name is required'),
  // email: z.string().email().min(1, 'Email is required'),
  // password: z.string().min(6, 'Password is required'),
  photoURL: z.any().nullable().optional() /*any, foda-se hahahaha */
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

  const { signUp } = useAuthStore()

  const onSubmit = async (data: RegisterInputProps) => {
    // console.log(data)
    // await signUp(data)
  }
  // console.log(import.meta.env.VITE_FIREBAE_STORAGEBUCKET)

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-background'>
      <div className='container p-8 mx-auto max-w-sm bg-receivedBg rounded-lg flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>Chat App</h1>
        <h1 className='text-2xl'>Register</h1>
        <FormProvider {...methods}>
          <form
            className='flex flex-col w-full'
            onSubmit={methods.handleSubmit(onSubmit)}>
            <Input type='text' placeholder='Name' name={'displayName'} />
            {/* <Input type='text' placeholder='E-mail Address' name={'email'} /> */}
            {/* <Input type='password' placeholder='Password' name={'password'} /> */}
            {/* <Input type='file' name={'photoURL'} /> */}
            <input type={'file'} {...methods.register('photoURL')} />
            <SubmitButton label='Sign Up' />
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
