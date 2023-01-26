
const SidebarHeader = () => {
  return (
    <div className='flex flex-row-reverse xl:flex-row items-center justify-between pb-4 border-b border-b-paragraph/40 xl:flex-1'>
      {/* Perfil */}
      <div className='flex gap-x-4 items-center justify-center'>
        <div className='w-12 h-12 rounded-full overflow-hidden'>
          <img
            src='/images/55.jpg'
            alt=''
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <h2 className='font-bold'>Xavier Mohead</h2>
        </div>
        <button className='border px-2'>Logout</button>
      </div>
    </div>
  )
}

export default SidebarHeader
