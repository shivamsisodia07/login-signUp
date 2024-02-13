import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='grid h-screen place-items-center'>
   
   <div className="flex justify-center mb-4 ">
        <NavLink to="/" className="py-2 px-4 border border-black rounded-3xl">
         Logout
        </NavLink>
      </div>
    
    
    </div>
   
  )
}

export default Home