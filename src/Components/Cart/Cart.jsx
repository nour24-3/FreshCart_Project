import React, { useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    setcartCounter,
    cartCounter,
  } = useContext(CartContext);
  const [cartDetails, setcartDetails] = useState(null);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    // console.log(response.data.data);
    if (response.data.status == "success") {
      setcartDetails(response.data.data);
      console.log(response.data.data);
    }
  }

  async function updateProduct(id, count) {
    let response = await updateCartProductQuantity(id, count);

    if (response.data.status == "success") {
      if (count == 0) {
        setcartCounter(cartCounter - 1);
      }
      // setcartCounter(cartCounter + 1);
      setcartDetails(response.data.data);
      toast.success("product updated successfully");
    } else {
      toast.error("Failed to update product");
    }
  }

  async function deleteItem(productId) {
    let response = await deleteCartItem(productId);
    console.log(response);
    if (response.data.status == "success") {
      setcartCounter(cartCounter - 1);
      setcartDetails(response.data.data);
    } else {
      toast.error("Failed to delete product");
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {cartDetails?.products.length > 0 ? (
        <>
          <h2 className="text-center text-2xl py-3 text-emerald-400 font-semibold">
            Total : {cartDetails?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs bg-violet-50 ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b border-gray-200 hover:bg-violet-100"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {product.price * product.count}EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        className="cursor-pointer font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/checkout">
              <button className="btn">Checkout</button>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-red-700 font-bold text-center my-8">
          no products in cart
        </h1>
      )}
    </>
  );
}
