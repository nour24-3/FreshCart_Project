import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleForget(value) {
    setisLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        value
      )
      .then((res) => {
        // console.log(res);
        setisLoading(false);
        if (res.data.statusMsg == "success") {
          // go to verify
          // console.log("ok");
          navigate("/verify");
        }
      })
      .catch((err) => {
        // console.log(err)
        setisLoading(false);
        setApiError(err.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("email is not valid")
      .required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForget,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-16">
      <div className="text-center font-bold text-emerald-600 text-4xl p-5">
        <h2>Forgot password</h2>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
      {ApiError ? (
        <div className=" mx-auto  text-red-700 font-bold  p-3">{ApiError}</div>
      ) : null}
      <div className="flex gap-5 items-center">
        <button
          type="submit"
          className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
        </button>
      </div>
    </form>
  );
}
