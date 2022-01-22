import { 
  loadProductsByCategoryAction, 
  loadProductsByCategorySuccessAction, 
  loadProductsByCategoryFailedAction, 
  loadProductByIdAction,
  loadProductByIdSuccessAction,
  loadProductByIdFaildedAction
} from "../actions/products"
import { loadProductsByCategoryFN, loadProductByIdFN } from "../services/apolloClient"
import { isBadUrl } from "../helpers/isBadUrl"

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
        let product = await loadProductByIdFN(name)
        let badUrls = [];
        let normalUrls = [];
        for await(const url of product.gallery) {
          if (await isBadUrl(url)) {
            badUrls.push(url)
          }
        }
        normalUrls = product.gallery.filter(el => !badUrls.some(url => url === el))
        product = {
          ...product,
          gallery: normalUrls
        }
        dispatch(loadProductByIdSuccessAction(product))
        resolve(product)
      } catch (error) {
        dispatch(loadProductByIdFaildedAction(error))
        reject(error)
      }
    })
  }
}