/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import {registerUserSignUpForm} from './functionsForBackends/allTheBackendsRoute'
import { ToastContainer, toast } from 'react-toastify'

import * as Yup from 'yup'

const initialValues = {
  name: '',
  email: '',
  password: ''
}

const validationSchema = Yup.object({
  name: Yup.string().required('Enter Your Name'),
  email: Yup.string()
    .required('Enter Your Email')
    .email('Should be a valid Email'),
  password: Yup.string().required('Enter Your Password')
})

const SignUp = () => {
  // const [errorInSignUp, setErrorInSignUp] = useState()

  const notify = (errorInSignUp) => toast.error(errorInSignUp,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  const signupNavigation = useNavigate()

  const {  mutate } = useMutation("registerUser", registerUserSignUpForm, {
    onError: (error) => {
      notify(error.message)
      console.log(error);
    },
    onSuccess: () => {
      signupNavigation('/signin')
    }
  })

  const registerUserSignUp = async (values) => {
      mutate({ ...values })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: registerUserSignUp
  })

  return (
    <div className='max-w-screen max-h-screen w-screen h-screen flex-col flex justify-center items-center'>
      <form
        className='rounded-md flex flex-col w-[90%] mx-auto bg-white md:w-[400px] '
        onSubmit={formik.handleSubmit}
      >
        <h1 className='text-xl md:text-3xl capitalize font-bold text-center my-5'>
          SignUp Form
        </h1>
        <div className='flex flex-col my-2 mx-3'>
          <label className='md:text-xl' htmlFor='name'>
            Name
          </label>
          <input
            className='border outline-none px-2 py-1 md:text-xl'
            onBlur={formik.handleBlur}
            type='text'
            id='name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <span className='text-xs text-red-600'>
            {formik.touched.name && formik.errors.name}
          </span>
        </div>
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
        <button
          type='submit'
          className='border mx-3 my-1 mt-6 p-2 font-medium'
        >
          Sign Up
        </button>
        <button
          type='button'
          className='mb-10 border mx-3 my-1 p-2 bg-yellow-600 text-white font-medium'
          onClick={() => signupNavigation('/signin')}
        >
          Log In
        </button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default SignUp
