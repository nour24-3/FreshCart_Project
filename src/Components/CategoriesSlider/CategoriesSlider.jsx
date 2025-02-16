import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from "react-slick";
import { Link } from 'react-router-dom';





export default function CategoriesSlider() {
  const [categories, setcategories] = useState([])

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 2000,
    };
  

  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      // console.log(res.data.data);
      setcategories(res.data.data)
    })
  }
  useEffect(()=>{
    getCategories()
  }, [])
  return (
      <>
      <Link to={"/categories"}>
      <h3 className='my-3 capitalize font-semibold text-gray-500'>popular categories</h3>
    <Slider {...settings}>
      {categories.map((category)=> <div key={category._id}>
        <img src={category.image} className='w-full h-[200px] object-cover' alt="" />
        <h4>{category.name}</h4>
      </div>)}
    </Slider>
      </Link>
  

      </>
  )
}
