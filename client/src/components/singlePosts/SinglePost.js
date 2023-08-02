/* eslint-disable max-len */
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import moment from 'moment'
// import { useSelector } from 'react-redux'
// import React, { useState,useEffect } from 'react'


const SinglePost = () => {

  const { _id } = useParams()
  // const {admin} = useSelector(state => state.admin)
  // const [adminInfo,setAdminInfo] = useState(null)
  
  const getSingleMemory = async () => {
    const res = await axios.get(`/posts/${_id}`)
    return res.data
  }

  const {data: memory, isLoading, error} = useQuery({
    queryKey: ['singleMemory', _id],
    queryFn: getSingleMemory
  })

  // useEffect(() => {
  //   setAdminInfo(admin)
  // },[admin])

  if (isLoading) return <h1>Loading...</h1>
  
  const {title, createdAt, message, selectedFile,creatorName} = memory

  return (
    <div className='bg-gray-100 max-w-[1120px] mx-auto'>
      {
        memory ?
        <>
      {memory.length === 0 && (
        <p className='min-h-screen text-2xl flex-col text-center md:text-4xl font-bold flex justify-center items-center bg-red-300'>
          Opps (: thier is no post with this title 
          <Link className='active underline hover:text-red-500 mt-4 transition-all' to='/'>Go to Home</Link>
        </p>
      )}
          <div>
            <div className='object-cover relative'>
              <img
                className='max-h-full max-w-full h-[50%] md:max-h-[50vh] md:w-full object-cover'
                src={`http://localhost:9001/${selectedFile}`}
                alt={`${title}`}
              />
              <p className='absolute top-4 left-8 font-bold text-red-700'>{moment(createdAt).fromNow()}</p>
              <p className='absolute top-4 right-8 text-2xl font-bold text-red-900 capitalize'>{ creatorName ? `Author is ${creatorName}` : 'unknown writer'}</p>
            </div>
            <div className='px-10 my-4'>
              <h1 className='md:text-3xl font-bold capitalize my-4'>{title}</h1>
              <p>{message}</p>
            </div>
          </div>
        </>:
        <h1>{error}</h1>
    }
    </div>
  )
}

export default SinglePost
