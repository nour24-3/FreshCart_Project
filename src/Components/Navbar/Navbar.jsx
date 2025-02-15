import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  let { cartCounter } = useContext(CartContext);
  let { wishListCounter } = useContext(WishlistContext);

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("../Login");
  }

  return (
    <>
      <nav className="bg-violet-400 fixed top-0 left-0 right-0 z-50 border-gray-200 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-5">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" width={150} alt="Flowbite Logo" />
            </Link>
            {userLogin != null ? (
              <>
                {" "}
                <ul className="flex gap-3 ">
                  <li>
                    <Link className="text-slate-600" to="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="categories">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="brands">
                      Brands
                    </Link>
                  </li>
                </ul>
              </>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {userLogin != null ? (
              <>
                <ul className="flex gap-4">
                  <li>
                    <Link className="text-slate-600 relative" to="cart">
                      <i className="fa-solid fa-cart-shopping"></i>{" "}
                      <div className="absolute top-[-10px] right-[-10px] size-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                        {cartCounter}
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600 relative" to="wishlist">
                      Wishlist
                      <div className="absolute top-[-10px] right-[-10px] size-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                        {wishListCounter}
                      </div>
                    </Link>
                  </li>
                </ul>
              </>
            ) : null}

            {userLogin != null ? (
              <>
                <ul>
                  <li>
                    <span onClick={signout} className="cursor-pointer">
                      Signout
                    </span>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="flex gap-4">
                <li>
                  <Link to="login">Login</Link>
                </li>
                <li>
                  <Link to="register">Register</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
