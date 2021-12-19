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

    case productTypes.LOAD_PRODUCT_BY_ID:
      return {
        ...state,
        isLoading: true
      }

    case productTypes.LOAD_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentProduct: action.payload
      }

    case productTypes.LOAD_PRODUCT_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case productTypes.REMOVE_PRODUCT_BY_ID:
      return {
        ...state,
        currentProduct: null
      }

    case productTypes.CHANGE_PRODUCT_ATTRIBUTE:
      const { attrType, val } = action;
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          attributes: [
            ...state.currentProduct.attributes
          ].map(attr => attr.id === attrType ? {
            ...attr,
            items: [
              ...attr.items
            ].map(attr => attr.value === val ? {
              ...attr,
              selected: true
            } : {
              ...attr,
              selected: false
            })
          } : {
            ...attr,
            items: [
              ...attr.items
            ]
          })
        }
      }

    default:
      return state
  }
}

export default productsReducer;