import { cartTypes } from "../actions/types";

const initialState = {
  shopingBag: [],
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        shopingBag: [
          ...state.shopingBag,
          {
            ...action.payload,
            quantity: 1
          }
        ]
      }

    case cartTypes.CHANGE_PRODUCT_ATTRIBUTE_IN_CART:
      const { productId, attrType, val } = action;
      return {
        ...state,
        shopingBag: [
          ...state.shopingBag
        ].map(product => {
          if (product.id === productId) {
            return {
              ...product,
              attributes: [
                ...product.attributes
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
          } return product
        })
      }

    case cartTypes.CHANGE_PRODUCT_QUANITY_IN_CART: 
      switch (action.val) {
        case 'inc':
          return {
            ...state,
            shopingBag: [
              ...state.shopingBag
            ].map(product => {
              if (product.id === action.productId) {
                return {
                  ...product,
                  quantity: product.quantity + 1
                }
              } return product
            })
          }
        case 'dec':
          return {
            ...state,
            shopingBag: [
              ...state.shopingBag
            ].map(product => {
              if (product.id === action.productId) {
                return {
                  ...product,
                  quantity: product.quantity > 0 ? product.quantity - 1 : product.quantity
                }
              } return product
            })
          }
      
        default:
          return state;
      }
    default:
      return state
  }
}

export default cartReducer;