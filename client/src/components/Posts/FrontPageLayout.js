/* eslint-disable max-len */
import Form from '../Form/Form.js'
import AllMemories from './AllMemories.js'
// import { useState } from 'react'

const FrontPageLayout = () => {
  // const [currentId,setCurrentId] = useState(0)
  return (
    <div className='max-w-[1200px] sm:gap-8 md:gap-0 mx-auto grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 '>
      <AllMemories/>
      <div className='order-first sm:order-last  md:order-last mt-5 '>
        <Form />
      </div>
    </div>
  )
}

export default FrontPageLayout
