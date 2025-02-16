import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Link } from 'react-router-dom';

export default function Wishlist() {
  let { getLoggedUserWishlist, deleteItem, setwishListCounter, wishListCounter } = useContext(WishlistContext);
  const [wishlistDetails, setwishlistDetails] = useState(null);
  const [loading, setloading] = useState(false);
  let { addToCart, setcartCounter, cartCounter } = useContext(CartContext);
  const [currentId, setcurrentId] = useState(0);

  async function addProductToCart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addToCart(id);
    // console.log(response.data);
    if (response.data.status == "success") {
      setcartCounter(cartCounter + 1);
      toast.success(response.data.message);
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }

  async function getWishlistItem() {
    let response = await  getLoggedUserWishlist();
    console.log(response);
    if (response.data.status == "success") {
      setwishlistDetails(response.data.data);
    }
  }

  async function deleteWishlistItem(productId) {
    let response = await deleteItem(productId);
    console.log(response);
    if (response.data.status == "success") {
      // setwishlistDetails(response.data.data);
      getWishlistItem()
      setwishListCounter(wishListCounter - 1)
      toast.success(response.data.message);
    }
    else {
      toast.error("Failed to delete product");
    } 
  }

  useEffect(() => {
    getWishlistItem();
    // getLoggedUserWishlist()
  }, []);

  return (
    <>
      {wishlistDetails?.length > 0 ? (
        <>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                {wishlistDetails?.map((product) => (
                  <tr
                    key={product?.id}
                    className="bg-white border-b border-gray-200 hover:bg-violet-100"
                  >
                    <td className="p-4">
                      <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                      <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => addProductToCart(product.id)}
                          className="btn"
                        >
                          {loading && currentId == product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "Add To Cart"
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {product.price}EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteWishlistItem(product.id)}
                        className="font-medium text-red-600  hover:underline cursor-pointer"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className=" text-3xl text-red-700 font-bold text-center my-8">
          No products to show
        </h1>
      )}
    </>
  );
}
