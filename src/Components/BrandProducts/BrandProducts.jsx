import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "./../../Context/WishlistContext";

export default function BrandProducts() {
  let { addToCart, setcartCounter, cartCounter } = useContext(CartContext);
  let {
    addProductToWishlist,
    deleteItem,
    setwishListCounter,
    wishListCounter,
  } = useContext(WishlistContext);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [loading, setloading] = useState(false);
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
  async function addToWishlist(id) {
    let response = await addProductToWishlist(id);
    // console.log(response.data);

    if (response.data.status == "success") {
      setwishListCounter(wishListCounter + 1);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {Loading ? (
        <div className="flex justify-center items-center my" role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-left gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="p-3 border  border-violet-200 rounded-md"
              >
                <div className="text-right cursor-pointer">
                  <i
                    onClick={() => addToWishlist(product.id)}
                    className="fa-regular fa-heart fa-lg "
                    style={{ color: "grey" }}
                  ></i>
                </div>
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full h-[400px] object-cover mb-3"
                    alt={product.title}
                  />
                  <h4 className="font-semibold mb-3">
                    {product.title.split(" ").slice(0, 4).join(" ")}
                  </h4>
                  <p className="text-right text-emerald-500">
                    {product.price}EGP
                  </p>
                </Link>
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="btn"
                >
                  {Loading && currentId == product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            ))
          ) : (
            <p className="font-bold text-2xl">
              No products to show☹️ <br />
              back to{" "}
              <Link className="text-blue-600 underline" to="/brands">
                brands
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
