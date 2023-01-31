import { useAuthStore } from '../context/useAuthStore'

interface UserProps {
  displayName: string
  photoURL: string
}

const SidebarHeader = () => {
  const { logout, currentUser } = useAuthStore()
  const { displayName, photoURL } = currentUser as UserProps

  const handleSignOut = () => {
    logout()
  }
  return (
    <div className='flex flex-row-reverse xl:flex-row items-center justify-between pb-4 border-b border-b-paragraph/40 xl:flex-1'>
      {/* Perfil */}
      <div className='flex gap-x-4 items-center justify-center'>
        <div className='w-12 h-12 rounded-full overflow-hidden'>
          <img
            src={photoURL}
            alt=''
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <h2 className='font-bold'>{displayName}</h2>
        </div>
        <button className='border px-2' onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default SidebarHeader
