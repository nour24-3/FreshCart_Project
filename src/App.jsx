import { useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/protectedRoute/protectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/AllOrders/AllOrders";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import Brands from "./Components/Brands/Brands";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import WishlistContextProvidor from "./Context/WishlistContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";
import ResetPassword from "./Components/ResetPassword/ResetPassword";



let query = new QueryClient();

let x = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      }, //index 3shan el home tigy awel 7aga ama aft7 el website
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "brand/:id",
        element: (
          <ProtectedRoute>
            <BrandProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      }, // : <= m3naha en hygely ay 7aga b3d elproductdetails

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "categoryproducts/:id",
        element: (
          <ProtectedRoute>
            <CategoryProducts />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "verify", element: <VerifyEmail /> },
      { path: "resetpassword", element: <ResetPassword /> },



      { path: "*", element: <Notfound /> }, // "*" de lw ay 7aga gher elfo2iha
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <WishlistContextProvidor>
                <RouterProvider router={x}></RouterProvider>
              </WishlistContextProvidor>
              <Toaster />
            </CartContextProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
