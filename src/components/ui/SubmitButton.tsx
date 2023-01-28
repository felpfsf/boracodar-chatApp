const SubmitButton = ({ label }: { label: string }) => {
  return (
    <button className='w-full border border-violet-500 py-2 bg-inputBg rounded-full mt-2'>
      {label}
    </button>
  )
}

export default SubmitButton
