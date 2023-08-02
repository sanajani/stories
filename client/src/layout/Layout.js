import Navbar from '../components/Navbar'
import React, { Suspense } from 'react'

const Layout = ({ children }) => {
  return (
    <Suspense>
      <Navbar />
      {children}
    </Suspense>
  )
}

export default Layout
