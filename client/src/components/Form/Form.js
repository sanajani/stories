// @ts-nocheck
/* eslint-disable max-len */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import {postNewMemory} from '../functionsForBackends/allTheBackendsRoute'
import {useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const maxSize = 1 * 1000 * 1000

const validFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp']
}

function isValidFileType (fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  )
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  message: Yup.string().required('Message is required'),
  tags: Yup.string().required('tags are required'),
  file: Yup.mixed()
    .required('Required')
    .test('is-valid-type', 'Not a valid image type', value =>
      isValidFileType(value && value?.name?.toLowerCase(), 'image')
    )
    .test(
      'is-valid-size',
      'Max allowed size is 1000KB',
      value => value && value.size <= maxSize
    )
})

const initialValues = {
  title: '',
  message: '',
  file: '',
  tags: ''
}

// form submition function
const Form = () => {
  // formdata values
  const queryClient = useQueryClient()
  const {admin: profile} = useSelector(state => state.admin)
  const {updatePostValues} = useSelector(state => state.updateMemorySlicer)
  const navigate = useNavigate()

  if(updatePostValues){
    initialValues.title = updatePostValues.title
    initialValues.message = updatePostValues.message
    initialValues.tags = toString(updatePostValues.tags.join())
    initialValues.file = updatePostValues.file
  }

  const { mutateAsync } = useMutation('postmemory', postNewMemory,{
    onSuccess: queryClient.invalidateQueries('memories')
  })

  const formSubmit = async (values, onSubmitProps) => {
    const { file, message, tags, title } = values
    const formData = new FormData()
    formData.append('title', title)
    formData.append('message', message)
    formData.append('tags', tags)
    formData.append('file', file)
    formData.append('creator',profile?.email)
    formData.append('creatorName',profile?.name)
    if(!updatePostValues){
      mutateAsync(formData)
      onSubmitProps.resetForm()
    }
    else{
      await axios.patch(`/posts/${updatePostValues._id}`,formData)
      navigate('/')
    }
  }

  const formik = useFormik({
    onSubmit: formSubmit,
    initialValues,
    validationSchema
  })


  return (
    <form
      className='flex flex-col py-4 md:p-9 rounded-md bg-gray-100 md:sticky md:top-12'
      onSubmit={formik.handleSubmit}
    >
      <h1 className='w-full text-center md:text-start font-bold font-mono text-xl sm:text-2xl  md:text-3xl'>
          Share your Memory 
      </h1>
      {profile ?
        <>
              <div className='mt-6 mx-2'>
        <div className='flex flex-col md:my-3'>
          <label className='my-1 md:text-xl' htmlFor='title'>
            Title
          </label>
          <input
            className='border-none outline-none text-xl p-2 rounded-md'
            type='text'
            name='title'
            id='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className='text-sm text-red-600'>
            {formik.touched.title && formik.errors.title}
          </span>
        </div>
        <div className='flex flex-col my-1 md:my-3 mx-2'>
          <label className='my-1 md:text-xl' htmlFor='message'>
            Message
          </label>
          <textarea
            name='message'
            id='message'
            cols={10}
            rows={2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className='border-none outline-none text-xl p-2 rounded-md'
          ></textarea>
          <span className='text-sm text-red-600'>
            {formik.touched.message && formik.errors.message}
          </span>
        </div>
        <div className='flex flex-col my-1 md:my-3 mx-2'>
          <label className='my-1 md:text-xl' htmlFor='tags'>
            Tags
          </label>
          <input
            className='border-none outline-none text-xl p-2 rounded-md'
            type='text'
            name='tags'
            id='tags'
            value={formik.values.tags}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='tags should separate with space'
          />
          <span className='text-sm text-red-600'>
            {formik.touched.tags && formik.errors.tags}
          </span>
        </div>
        <div className='flex flex-col my-1 md:my-3 mx-2'>
          <label className='my-1 md:text-xl'>Select File</label>
          <input
            className='overflow-hidden cursor-pointer'
            type='file'
            id='file'
            accept='image/*'
            onChange={e => {
              formik.setFieldValue('file', e.target.files[0])
            }}
          />
          <span className='w-full h-9 bg-yellow-400'></span>
          <span className='text-sm text-red-600'>
            {formik.touched.file && formik.errors.file}
          </span>
        </div>
      </div>
 
      <button
        className='mt-4 md:mt-0 md:my-3 mx-2 bg-slate-900 cursor-pointer text-white py-2 font-medium md:font-semibold rounded-md text-lg'
        type='submit'
      >
        Submit
      </button>
      </>:
        <h1 className='my-6'>For sharing your thoughts and liking others posts please create an account for your self </h1>
      }
    </form>
  )
}

export default Form
