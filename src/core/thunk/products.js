import { loadProductsByCategoryAction, loadProductsByCategorySuccessAction, loadProductsByCategoryFailedAction } from "../actions/products"
import { loadProductsByCategoryFN } from "../services/apolloClient"

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