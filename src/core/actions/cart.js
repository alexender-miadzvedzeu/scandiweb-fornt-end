import { cartTypes } from "./types";

export const addProductToCartAction = payload => ({
  type: cartTypes.ADD_PRODUCT_TO_CART,
  payload
})

export const changeProductAttributeInCartAction = (index, attrType, val) => ({
  type: cartTypes.CHANGE_PRODUCT_ATTRIBUTE_IN_CART,
  index,
  attrType,
  val
})

export const changeProductQuanityInCartAction = (index, val) => ({
  type: cartTypes.CHANGE_PRODUCT_QUANITY_IN_CART,
  index,
  val
})

export const removeFromBagAction = index => ({
  type: cartTypes.REMOVE_FROM_BAG,
  index
})

export const listImageAction = (opt, index) => ({
  type: cartTypes.LIST_IMAGE,
  opt,
  index
})