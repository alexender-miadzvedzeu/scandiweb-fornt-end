import { productTypes } from "./types";

export const loadProductsByCategoryAction = () => ({
  type: productTypes.LOAD_PRODUCTS_BY_CATEGORY
})

export const loadProductsByCategorySuccessAction = payload => ({
  type: productTypes.LOAD_PRODUCTS_BY_CATEGORY_SUCCES,
  payload
})

export const loadProductsByCategoryFailedAction = error => ({
  type: productTypes.LOAD_PRODUCTS_BY_CATEGORY_FAILED,
  error
})

export const loadProductByIdAction = () => ({
  type: productTypes.LOAD_PRODUCT_BY_ID
})

export const loadProductByIdSuccessAction = payload => ({
  type: productTypes.LOAD_PRODUCT_BY_ID_SUCCESS,
  payload
})

export const loadProductByIdFaildedAction = error => ({
  type: productTypes.LOAD_PRODUCT_BY_ID_FAILED,
  error
})

export const removeProductByIdAction = () => ({
  type: productTypes.REMOVE_PRODUCT_BY_ID,
})

export const changeProductAttributeAction = (attrType, val) => ({
  type: productTypes.CHANGE_PRODUCT_ATTRIBUTE,
  attrType,
  val
})