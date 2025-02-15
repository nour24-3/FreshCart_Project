import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import style from "./Layout.module.css"

export default function Layout() {
  return <>
  
  <Navbar/>

<div className='container w-[90%]  my-5 mx-auto py-16 lg:py-16'>
  <Outlet/>
</div>

  <Footer/>
  
  </>
}
