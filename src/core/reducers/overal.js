import { overalTypes } from "../actions/types";

const initialState = {
  currencies: []
}

const overalReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case overalTypes.LOAD_CURRENCIES:
      return {
        ...state,
        isLoading: true
      }
    
    case overalTypes.LOAD_CURRENCIES_SUCCES:
      return {
        ...state,
        currencies: action.payload,
        currentCurrency: action.payload[0],
        isLoading: false
      }

    case overalTypes.LOAD_CURRENCIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case overalTypes.LOAD_CATEGORIES:
      return {
        ...state,
        isLoading: true
      }
    
    case overalTypes.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        currentCategory: action.payload[0].name,
        isLoading: false
      }
    
    case overalTypes.LOAD_CURRENCIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    
    case overalTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: state.categories.reduce((acc, val) => acc = val.name === action.name ? val.name : acc, '')
      }
    default:
      return state
  }
}

export default overalReducer;