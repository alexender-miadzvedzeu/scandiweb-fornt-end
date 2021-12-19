import { cartTypes } from "./types";

export const addProductToCartAction = payload => ({
  type: cartTypes.ADD_PRODUCT_TO_CART,
  payload
})
