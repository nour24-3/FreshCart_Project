import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from './../../Context/UserContext';


export default function Register() {
  let {userLogin, setuserLogin} = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loading, setLoding] = useState(false);

  function handleRegister(Register) {
    setLoding(true);

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, Register)
      .then((res) => {
        setLoding(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token)
          navigate("/");
        }
      })
      .catch((res) => {
        setLoding(false);
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "The name must be more than 3 letters long")
      .max(15, "the name must be less than 10 letters long")
      .required("name is required"),
    email: yup
      .string()
      .email("email is not valid")
      .required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password must be at least 6 characters long"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "doesn't match the password")
      .required("rePassword is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "phone number isn't valid")
      .required("phone number is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-16 ">
      <div className="text-center font-bold text-emerald-600 text-4xl p-5">
        <h2>Register</h2>
      </div>
      <div className="relative z-0 w-full mb-5  group">
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 
      bg-transparent border-0 border-b-2 border-gray-300 appearance-none   
      focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 
      scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
      rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
      peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6"
        >
          Name
        </label>
        {formik.errors.name && formik.touched.name ? (
          <div
            className="p-2 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.name}</span>
          </div>
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-5 left-0 group">
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 
      bg-transparent border-0 border-b-2 border-gray-300 appearance-none   
      focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 
      scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
      rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
      peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6"
        >
          Email
        </label>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-2 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-5 left-0 group">
        <input
          type="password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 
      bg-transparent border-0 border-b-2 border-gray-300 appearance-none   
      focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 
      scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
      rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
      peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6"
        >
          Password
        </label>
        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-2 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.password}</span>
          </div>
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-5 left-0 group">
        <input
          type="password"
          name="rePassword"
          id="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 
      bg-transparent border-0 border-b-2 border-gray-300 appearance-none   
      focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="rePasswod"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 
      scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
      rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
      peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6"
        >
          rePassword
        </label>
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div
            className="p-2 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div>
        ) : null}
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
      {apiError ? (
        <div className="w-1/2 mx-auto  text-red-700 font-bold  p-3">
          {apiError}
        </div>
      ) : null}{" "}
      <div className="flex gap-5 items-center">
        <button
          type="submit"
          className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 
    focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
        <Link to={"./../Login"}>
          <span className="text-blue-600 underline">
            do you have an account? Login now
          </span>
        </Link>
      </div>
    </form>
  );
}
