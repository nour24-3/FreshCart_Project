import React, { useContext } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let {cartId} = useContext(CartContext)
  let { checkoutFunction } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () =>
      handleCheckout(cartId, `http://localhost:5173`),
  });

  async function handleCheckout(cartId, url) {
    let {data} = await checkoutFunction(cartId, url, formik.values);
    // console.log(data.session.url);
    window.location.href = data.session.url
    
  }

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-16 ">
      <div className="text-center font-bold text-emerald-600 text-4xl p-5">
        <h2>Checkout now</h2>
      </div>

      <div className="relative z-0 w-full mb-5 left-0 group">
        <input
          type="text"
          name="details"
          id="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 
      bg-transparent border-0 border-b-2 border-gray-300 appearance-none   
      focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="details"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 
      scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
      rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
      peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6"
        >
          Details
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 left-0 group">
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 
      bg-transparent border-0 border-b-2 border-gray-300 appearance-none   
      focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 
      scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
      rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
      peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6"
        >
          Phone
        </label>
        {formik.errors.phone && formik.touched.phone ? (
          <div
            className="p-2 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.phone}</span>
          </div>
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-5 left-0 group">
        <input
          type="text"
          name="city"
          id="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 
      bg-transparent border-0 border-b-2 border-gray-300 appearance-none   
      focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="city"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 
      scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
      rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
      peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6"
        >
          City
        </label>
      </div>

      <div className="flex gap-5 items-center">
        <button
          type="submit"
          className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 
    focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Checkout
        </button>
      </div>
    </form>
  );
}
