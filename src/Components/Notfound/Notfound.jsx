import React from 'react'
import img1 from "./../../assets/error.svg"
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (<>
  
 

    <div className='flex justify-center items-center my-20' >
      <img src={img1} alt="" />
    </div>
    <h2 className='text-xl text-center font-semibold mx-5'>Oops! This page is missing. <br />
    It seems you've taken a wrong turn. Let's get you back <span className='text-blue-600 underline'>h</span>
    <Link className='text-blue-600 underline' to="/">ome</Link></h2>
    </>)
}
