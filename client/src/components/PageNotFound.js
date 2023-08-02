import { Link } from "react-router-dom"
const PageNotFound = () => {
  return (
    <div className='w-full h-[400px] flex justify-center items-center flex-col'>
    <h1 className='text-3xl font-bold text-white sm:text-5xl block'>Page not found</h1>
    <Link className='text-2xl text-white underline  mt-10' to='/'>GO back to home</Link>
  </div>
  )
}

export default PageNotFound