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
          ...state.shopingBag
        ].some(el => JSON.stringify(el.attributes) === JSON.stringify(action.payload.attributes)) ?
          [
            ...state.shopingBag
          ].reduce((res, val) => JSON.stringify(val.attributes) === JSON.stringify(action.payload.attributes) ? 
            [
              ...res,
              {
                ...val,
                quantity: val.quantity + 1
              }
            ] : [
              ...res,
              val
            ], []) : [
            ...state.shopingBag,
            {
              ...action.payload,
              currentImage: {
                url: action.payload.gallery[0],
                index: 0
              },
              quantity: 1
            }
          ]
      }

    case cartTypes.CHANGE_PRODUCT_ATTRIBUTE_IN_CART:
      const { attrType, val } = action;
      return {
        ...state,
        shopingBag: [
          ...state.shopingBag
        ].map((product, index) => {
          if (index === action.index) {
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
      if (action.val === 'inc') {
        return {
          ...state,
          shopingBag: [
            ...state.shopingBag
          ].map((product, index) => {
            if (index === action.index) {
              return {
                ...product,
                quantity: product.quantity + 1
              }
            } return product
          })
        }
      }
      if (action.val === 'dec') {
        return {
          ...state,
          shopingBag: [
            ...state.shopingBag
          ].map((product, index) => {
            if (index === action.index) {
              return {
                ...product,
                quantity: product.quantity > 0 ? product.quantity - 1 : product.quantity
              }
            } return product
          }).filter(product => product.quantity > 0)
        }
      }
      return state
    
    case cartTypes.REMOVE_FROM_BAG:
      return {
        ...state,
        shopingBag: [
          ...state.shopingBag
        ].filter((el, index) => index !== action.index)
      }
    
    case cartTypes.LIST_IMAGE:
      if(action.opt === 'prev') {
        return {
          ...state,
          shopingBag: [
            ...state.shopingBag
          ].map((el, index) =>
            index === action.index ?
              {
                ...el,
                currentImage: {
                  ...el.currentImage,
                  index: el.currentImage.index === 0 ? el.gallery.length - 1 : el.currentImage.index - 1,
                  url: el.gallery[el.currentImage.index === 0 ? el.gallery.length - 1 : el.currentImage.index - 1]
                }
              } : el
          )
        }
      } 
      if (action.opt === 'next') {
        return {
          ...state,
          shopingBag: [
            ...state.shopingBag
          ].map((el, index) =>
            index === action.index ?
              {
                ...el,
                currentImage: {
                  ...el.currentImage,
                  index: el.currentImage.index === el.gallery.length - 1 ? 0 : el.currentImage.index + 1,
                  url: el.gallery[el.currentImage.index === el.gallery.length - 1 ? 0 : el.currentImage.index + 1]
                }
              } : el
          )
        }
      }
      return {
        ...state
      }
    default:
      return state
  }
}

export default cartReducer;