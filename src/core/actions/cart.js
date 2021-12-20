import { cartTypes } from "./types";

export const addProductToCartAction = payload => ({
  type: cartTypes.ADD_PRODUCT_TO_CART,
  payload
})

export const changeProductAttributeInCartAction = (productId, attrType, val) => ({
  type: cartTypes.CHANGE_PRODUCT_ATTRIBUTE_IN_CART,
  productId,
  attrType,
  val
})

export const changeProductQuanityInCartAction = (productId, val) => ({
  type: cartTypes.CHANGE_PRODUCT_QUANITY_IN_CART,
  productId,
  val
})