/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
import { useQuery, useMutation, useQueryClient } from 'react-query'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { fetchAllMemories } from '../functionsForBackends/allTheBackendsRoute'
import { useSelector, useDispatch } from 'react-redux'
import { updateMemorySlice } from '../../features/updateSlice'
import { addAdmin } from '../../features/adminSlice'
import axios from 'axios'

const AllMemories = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const {admin} = useSelector(state => state.admin)

  // function for deleting memory
  const deleteMemory = async (_id) => {
    try {
      const response = await axios.delete(`/posts/${_id}`)
      return response.data
    } catch (error) {
      console.log(error);
    }
  }
  // mutation function for deleting memory
  const {mutate} = useMutation(
    'deleteuser',
    deleteMemory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('memories')
      }
    }
  )

  // fetch all memories
 const fetchAllMemories = async () => {
  try {
    const res = await axios.get('/posts')
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

  const {loading, error, data:backenddatatofecthallposts } = useQuery({
    queryKey: ['memories'],
    queryFn: fetchAllMemories
  })

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('profile')) || null
    dispatch(addAdmin(localStorageData)) 
  }, [dispatch])

  return (
    <div className='md:col-span-2 flex flex-wrap md:gap-8' key={'loading'}>
      {loading && (
        <p className='loading text-3xl md:text-6xl font-bold flex justify-center items-center text-white w-full'>
          real Loading...
        </p>
      )}
      {!backenddatatofecthallposts?.data?.length && (
        <p className='loading text-3xl md:text-6xl font-bold flex justify-center items-center text-white w-full' key={'nodataloading'}>
          Loading..
        </p>
      )}
      {error && (
        <p className='loading text-4xl font-bold flex justify-center items-center text-white w-full' key={'errorloading'}>
          Something went wrong while fetching data
        </p>
      )}
      {backenddatatofecthallposts?.data?.map(memory => {
        const {message, selectedFile, tags, title, _id, creator } = memory
        const smmessage = message && message.slice(0, 140)
        const tag = tags && tags.toString().split(' ')
        return (
          <div
            className='bg-gray-100 w-full md:w-[46%] rounded-2xl my-5 md:my-0'
            key={_id}
          >
            <Link to={`/memroy/${_id}`}>
              <div className='h-[300px] rounded-t-2xl'>
                <img
                  className='max-h-full h-full w-full object-cover rounded-t-2xl'
                  src={`http://localhost:9001${selectedFile}`}
                  alt={`${title}`}
                />
              </div>
              <div className='flex px-4 py-1 md:px-3 flex-wrap  max-w-full'>
                {tag?.length &&
                  tag.map((everyTag, index) => {
                    return (
                        <span key={index} className='underline px-1 py-1 text-xs sm:text-sm'>
                        {everyTag}
                      </span>
                    )
                  })}
              </div>
              <h1 className='px-4 font-bold py-1 capitalize md:py-2 md:px-3 text-xl sm:text-2xl md:text-3xl'>
                {title}
              </h1>
              <p className='px-4 font-bold py-1 md:py-2 md:px-3 text-base sm:text-lg md:text-xl'>
                {smmessage}
              </p>
            </Link>

            <div className='px-4 font-bold py-1 md:py-2 md:px-3 text-base sm:text-lg md:text-xl flex justify-between'>
              {admin && admin?.email === creator ?
              <div>
              <button className='border-2 py-1 px-1 cursor-pointer mx-2'
              onClick={() => dispatch(updateMemorySlice({title,message, tags,  selectedFile,_id}))}
              >
                update&nbsp;
                &nbsp;
              </button>
               <button className='border-2 py-1 px-1 cursor-pointer ' onClick={() => mutate(_id)}>
                De&nbsp;
                &nbsp;
              </button>
              </div>
            : null  
            }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AllMemories
