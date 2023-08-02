// import {  } from 'react-router-dom'
import axios from 'axios'

import Layout from './layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React, { lazy  } from 'react'
import PageNotFound from './components/PageNotFound'
import Protected from './components/Protected'

const FrontPageLayout = lazy(() => import('./components/Posts/FrontPageLayout'))
const SignUp = lazy(() => import('./components/SignUp'))
const SignIn = lazy(() => import('./components/SignIn'))
const SinglePost = lazy(() => import('./components/singlePosts/SinglePost'))
const profile = JSON.parse(localStorage.getItem('profile'))
console.log(profile);
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <FrontPageLayout />
      </Layout>
    )
  },
  {
    path: '/memroy/:_id',
    element: (
      <Layout>
        <SinglePost />
      </Layout>
    )
  },
  {
    path: '/signin',
    element: (
      <Layout>
        <Protected profile={profile}>
          <SignIn />
        </Protected>
      </Layout>
    )
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <Protected profile={profile}>
          <SignUp />
        </Protected>      
      </Layout>
    )
  },
  {
    path: '*',
    element: (
      <PageNotFound />
    )
  }
])



axios.defaults.baseURL = 'http://localhost:9001'
axios.defaults.withCredentials = true

const App = () => {
  return (
    <div className=' overflow-hidden min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
