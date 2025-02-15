import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";


export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([])
  let { id, category } = useParams();


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setproduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getAllProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      let related = res.data.data.filter((product) => product.category.name == category )
      setrelatedProducts(related);
      
    })

  }

  useEffect(() => {
    getProduct(id);
    getAllProducts()
  }, [ id , category]);

  return (
    <>
      <div className="row items-center my-5">
        <div className="w-1/4">
        <Slider {...settings}>
          {product?.images.map((src)=> <img src={src} className="w-full"/>)}
        </Slider>

        </div>
        <div className="w-3/4 p-4">
          <h3 className="font-semibold capitalize text-2xl">{product?.title}</h3>
          <h4 className="text-gray-500 my-4">{product?.description}</h4>
          <h4 className="text-emerald-400">{product?.category.name}</h4>
          <div className='flex justify-between my-5 p-3 '>
              <span>{product?.price} EGP</span>
              <span ><i className='fas fa-star text-yellow-500'></i>{product?.ratingsAverage}</span>
            </div>
            <button className='btn'>Add to cart</button>
        </div>
      </div>
      <div className="row">
    {relatedProducts.length > 0 ? relatedProducts.map((product)=> (
      <div key={product.id} className='w-1/6'>
        
        <div className="products my-2 p-2">
        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
            <img src={product.imageCover} className='w-full' alt="" />
            <h3 className=' text-emerald-400'>{product.category.name}</h3>
            <h4 className='font-semibold mb-3'>{product.title.split(" ").slice(0,2).join(" ")}</h4>
            <div className='flex justify-between '>
              <span>{product.price} EGP</span>
              <span ><i className='fas fa-star text-yellow-500'></i>{product.ratingsAverage}</span>
            </div>
            </Link>
            <button className='btn'>Add to cart</button>
        </div>
      </div>
      )): <div className='flex justify-center items-center px-20 mx-20 ' role="status">
      <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
  </div>}
    </div>
    </>
  );
}
