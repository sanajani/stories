import axios from 'axios'

export const loginForm = async ({email, password}) => {
  
  try {
    const res = await axios.post('/user/login', {
      email,
      password
    })

    return res.data
  } catch (error) {
    const errorMessage = (error?.response?.data?.message) || 'something went wrong in backend signin form function' ;
    throw new Error(
      errorMessage
    )
  }
}

export const registerUserSignUpForm = async ({ name, email, password }) => {
  console.log(name);
    try {
      const res = await axios.post('/user/register', {
        name,
        email,
        password
      })
      console.log(res.status);
      return res.data
    } catch (error) {
      const errorMessage = (error?.response?.data?.message) || 'something went wrong in backend signup form function' ;
      throw new Error(
        errorMessage
      )    }
}

export const postNewMemory = async (formdata) => {
  try {
    const response = await axios.post('/posts',formdata)
    return response.data
  } catch (error) {
    throw new Error(error)
  } 
}

// update memory
export const updateMemoryByID = async ({formdata, _id}) => {
  console.log(_id);
  try {
    const response = await axios.patch(`/posts/${_id}`,formdata)
    return response.data
  } catch (error) {
    throw new Error(error)
  } 
}

// // fetch all memories
// export const fetchAllMemories = async () => {
//   try {
//     const res = await axios.get(`/posts?page=${page}`)
//     return res.data
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// get single post
export const getSingleMemory = async ({_id}) => {
  const res = await axios.get(`/posts/${_id}`)
  return res.data
}

export const fetchUser = async () => {
  try {
    const response = await axios.get('/user/isuser')
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteUser = async () => {
  try {
    const response = await axios.delete('/user/logout')
    localStorage.clear()
    return response.data
  } catch (error) {
    console.log(error);
  }
}

