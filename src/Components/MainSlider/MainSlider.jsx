import React from "react";
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../assets/slider-image-1.jpeg";
import img2 from "../../assets/slider-image-2.jpeg";
import img3 from "../../assets/slider-image-3.jpeg";
import img4 from "../../assets/grocery-banner.png";
import img5 from "../../assets/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={img3} className="w-full h-[400px] object-cover" alt="" />
            <img src={img4} className="w-full h-[400px] object-cover" alt="" />
            <img src={img5} className="w-full h-[400px] object-cover" alt="" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={img2} className="w-full h-[200px]" alt="" />
          <img src={img3} className="w-full h-[200px]" alt="" />
        </div>
      </div>
    </>
  );
}
