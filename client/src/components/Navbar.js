/* eslint-disable max-len */
import { Link, NavLink } from 'react-router-dom'
import { deleteUser } from './functionsForBackends/allTheBackendsRoute'
import { useMutation } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { removeAdmin } from '../features/adminSlice'
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [profile, setProfile] = useState(null)
  const dispatch = useDispatch()
  const { mutate } = useMutation(
    'deleteuser',
    deleteUser,
    {
      onSuccess: () => {
        dispatch(removeAdmin())
      },
      onError: (error) => {
        console.log('error in mutation fail case navbar line 20', error);
      }
    }
  )

  const { admin } = useSelector(state => state.admin)

  useEffect(() => {
    setProfile(admin)
  }, [admin, setProfile])

  const [toggleNav, setTogglenav] = useState(false)

  return (
    <div className='md:max-w-full h-full'>
      <nav className='flex justify-between mx-auto items-center my-4 max-w-[90%] md:max-w-[1140px] bg-white py-4 px-6 rounded-md '>
        <span className='font-bold text-xl md:text-3xl'>Memories</span>
        <ul className='hidden md:flex gap-7'>
          <li className='text-xl'>
            <NavLink to='/'>Home</NavLink>
          </li>
          {
            !profile?.name ? <>
              <li className='text-xl'>
                <NavLink to='/signin'>Sign In</NavLink>
              </li>
              <li className='text-xl'>
                <NavLink to='/signup'>Sign Up</NavLink>
              </li>
            </>
              :
              <>
                <Link className=' text-xl' onClick={mutate}>Logout</Link>
              </>
          }
        </ul>
        <button
          className='md:hidden w-10 h-10  text-white relative'
          onClick={() => setTogglenav(!toggleNav)}
        >
          <span className='absolute w-full h-1 bg-black top-1 left-0'></span>
          <span className='absolute w-full h-1 bg-black top-4 left-0'></span>
          <span className='absolute w-full h-1 bg-black top-7 left-0'></span>
        </button>
      </nav>

      <div
        className={
          toggleNav
            ? 'md:hidden z-50 h-screen w-[100%] fixed right-0 bg-red-200 top-0'
            : 'md:hidden h-screen w-[100%] fixed bg-red-200 top-0 right-[-12000px]'
        }
      >
        <button
          className=' w-8 h-8 relative mx-5 my-5'
          onClick={() => setTogglenav(!toggleNav)}
        >
          <span className='w-10 h-1 bg-black absolute top-0 left-0  rotate-45 origin-left' ></span>
          <span className='w-10 h-1 bg-black bottom-0 left-0 absolute -rotate-45 origin-left'></span>
        </button>
        <ul className='`leading-loose mt-20 py-10'>
          <li
            className='navLink transition-all'
            onClick={() => setTogglenav(!toggleNav)}
          >
            <NavLink to='/'>Home</NavLink>
          </li>
          {profile ?
            <Link className=' text-xl navLink' onClick={mutate}>Logout</Link>
            :
            <>
              <li
                className='navLink transition-all'
                onClick={() => setTogglenav(!toggleNav)}
              >
                <NavLink to='/signin'>Sign In</NavLink>
              </li>
              <li
                className='navLink transition-all'
                onClick={() => setTogglenav(!toggleNav)}
              >
                <NavLink to='/signup'>Sign Up</NavLink>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar
