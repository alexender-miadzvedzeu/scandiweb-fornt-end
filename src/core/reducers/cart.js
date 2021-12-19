import { cartTypes } from "../actions/types";

const initialState = {
  productsBag: [],
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        productsBag: [
          ...state.productsBag,
          {
            ...action.payload,
            quantity: 1
          }
        ]
      }
    
    default:
      return state
  }
}

export default cartReducer;