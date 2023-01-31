import { ref, uploadBytes } from 'firebase/storage'
import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { storage } from '../services/firebase'

const Teste = () => {
  // const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    photoURL: null
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    // setFormData(prevData => ({ ...prevData, photoURL: file }))
    setFormData(prevData => ({
      ...prevData,
      photoURL: file
    }))
  }

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData.photoURL.name)
    const storageRef = ref(
      storage,
      `images/${'formPadrãoFormData' + formData.photoURL.name}`
    )
    uploadBytes(storageRef, formData.photoURL).then(snapshot => {
      console.log(snapshot)
    })
  }

  const onFileChange = (e: any) => {
    const file = e.target.files[0]
    // console.log(file.name)
    const storageRef = ref(storage, `images/${'formPadrão' + file.name}`)
    uploadBytes(storageRef, file).then(res => {
      console.log(res)
    })
  }

  const handleFileUploads = (e: SyntheticEvent) => {
    e.preventDefault()
  }

  const { register, handleSubmit } = useForm()
  const handleFileUpload = (data: any) => {
    const { photoURL } = data
    console.log(photoURL[0].name)

    const photoBlob = new Blob([photoURL], { type: 'image/jpg' })
    console.log(photoBlob)

    const storageRef = ref(storage, `images/${'formRHF' + photoURL[0].name}`)
    // const metadata = {
    //   contentType: 'image/jpg'
    // }
    uploadBytes(storageRef, photoBlob).then(res => {
      console.log(res)
    })
  }

  return (
    <div className='w-full m-auto items-center justify-center'>
      <form
        // onSubmit={handleFileUploads}
        onSubmit={formSubmit}
        className='flex flex-col w-[540px] mt-8 mx-auto items-center'>
        <h1>Form padrão</h1>
        <input
          type='text'
          name='name'
          id=''
          placeholder='test name'
          onChange={handleChange}
        />
        <input type='file' name='photoURL' onChange={handleFileChange} />
        {/* <input type='file' name='photoURL' onChange={onFileChange} /> */}
        <button className='mt-4 border py-2 px-4'>Enviar</button>
      </form>
      <form
        className='flex flex-col w-[540px] mt-8 mx-auto items-center'
        onSubmit={handleSubmit(handleFileUpload)}>
        <h1>Form React Hook Form</h1>
        <input type='file' {...register('photoURL')} name='photoURL' />
        <button className='mt-4 border py-2 px-4'>Enviar</button>
      </form>
    </div>
  )
}

export default Teste
