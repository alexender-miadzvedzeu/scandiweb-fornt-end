import { productTypes } from "../actions/types";

const initialState = {
  products: [],
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case productTypes.LOAD_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        isLoading: true
      }
    
    case productTypes.LOAD_PRODUCTS_BY_CATEGORY_SUCCES:
      return {
        ...state,
        products: action.payload,
        isLoading: false
      }

    case productTypes.LOAD_PRODUCTS_BY_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

export default productsReducer;