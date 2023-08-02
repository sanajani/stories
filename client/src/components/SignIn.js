/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useMutation } from 'react-query'
import { loginForm } from './functionsForBackends/allTheBackendsRoute'
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { addAdmin } from '../features/adminSlice'
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Enter Your Email')
    .email('Should be a valid Email'),
  password: Yup.string().required('Enter Your Password')
})



const SignUp = () => {  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const onError = (err) => {
    navigate('/signin')
    console.log(err);
  }

  const { mutateAsync } = useMutation('loginUser', loginForm,
   {
    onError,
    onSuccess: (data) => {
      // localStorage.setItem('profile', JSON.stringify(data?.user))
      dispatch(addAdmin(data?.user))
      navigate('/')
    }
   })

    const notify = (errorinlogin) => toast.error(errorinlogin,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
    
  const signInFunc = async (values) => {
    try {
      await mutateAsync({...values})
    } catch (error) {
      notify(error.message)
      navigate('/signin')
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: signInFunc
  })
  return (
    <div className='max-w-screen max-h-screen w-screen h-screen flex justify-center items-center'>
      <ToastContainer />
      <form className=' rounded-md flex flex-col w-[90%] mx-auto bg-white md:w-[400px] '
      onSubmit={formik.handleSubmit}
      >
        <h1 className='text-xl md:text-3xl capitalize font-bold text-center my-5'>
          SignIn Form
        </h1>
        <div className='flex flex-col my-2 mx-3'>
          <label className='md:text-xl' htmlFor='email'>
            Email
          </label>
          <input
            className='border outline-none px-2 py-1 md:text-xl'
            onBlur={formik.handleBlur}
            type='text'
            id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <span className='text-xs text-red-600'>
            {formik.touched.email && formik.errors.email}
          </span>
        </div>
        <div className='flex flex-col my-2 mx-3'>
          <label className='md:text-xl' htmlFor='password'>
            Password
          </label>
          <input
            className='border outline-none px-2 py-1 md:text-xl'
            onBlur={formik.handleBlur}
            type='password'
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span className='text-xs text-red-600'>
            {formik.touched.password && formik.errors.password}
          </span>
        </div>
        <button type='submit' className='border mx-3 my-1 mt-6 p-2 font-medium'>
          Sign In
        </button>
        <button
        type='button'
          className='mb-10 border mx-3 my-1 p-2 bg-yellow-600 text-white font-medium'
          onClick={() => navigate('/signup')}
        >
          Create an account
        </button>
      </form>
    </div>
  )
}

export default SignUp
