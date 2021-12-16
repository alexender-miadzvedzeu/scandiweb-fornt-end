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