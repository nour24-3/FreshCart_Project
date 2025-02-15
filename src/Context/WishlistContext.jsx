import axios from "axios";
import { createContext, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvidor(props) {
  let headers = { token: localStorage.getItem("userToken") };
  const [wishListCounter, setwishListCounter] = useState(0);

  function addProductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserWishlist() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,

        { headers }
      )
      .then((res) => {
        setwishListCounter(res.data.count);
        console.log(res);
        return res
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) =>{
        console.log(res);
        return res
      } 
        )
      .catch((err) => err);
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getLoggedUserWishlist,
        deleteItem,
        setwishListCounter,
        wishListCounter,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
