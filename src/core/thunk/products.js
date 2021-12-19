import { 
  loadProductsByCategoryAction, 
  loadProductsByCategorySuccessAction, 
  loadProductsByCategoryFailedAction, 
  loadProductByIdAction,
  loadProductByIdSuccessAction,
  loadProductByIdFaildedAction
} from "../actions/products"
import { loadProductsByCategoryFN, loadProductByIdFN } from "../services/apolloClient"

export const loadProductsByCategoryThunk = name => {
  return dispatch => {
    dispatch(loadProductsByCategoryAction())
    return new Promise(async(resolve, reject) => {
      try {
        const currencies = await loadProductsByCategoryFN(name)
        dispatch(loadProductsByCategorySuccessAction(currencies))
        resolve(currencies)
      } catch (error) {
        dispatch(loadProductsByCategoryFailedAction(error))
        reject(error)
      }
    })
  }
}

export const loadProductByIdThunk = name => {
  return dispatch => {
    dispatch(loadProductByIdAction())
    return new Promise(async(resolve, reject) => {
      try {
        const product = await loadProductByIdFN(name)
        dispatch(loadProductByIdSuccessAction(product))
        resolve(product)
      } catch (error) {
        dispatch(loadProductByIdFaildedAction(error))
        reject(error)
      }
    })
  }
}