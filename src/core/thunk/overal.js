import { loadCategoriesAction, loadCategoriesFailedAction, loadCategoriesSuccessAction, loadCurrenciesAction, loadCurrenciesFailedAction, loadCurrenciesSuccessAction } from "../actions/overal"
import { loadCurrenciesFN, loadCutegoriesFN } from "../services/apolloClient"

export const loadCurrenciesThunk = () => {
  return dispatch => {
    dispatch(loadCurrenciesAction())
    return new Promise(async(resolve, reject) => {
      try {
        const currencies = await loadCurrenciesFN()
        dispatch(loadCurrenciesSuccessAction(currencies))
        resolve(currencies)
      } catch (error) {
        dispatch(loadCurrenciesFailedAction(error))
        reject(error)
      }
    })
  }
}

export const loadCategoriesThunk = () => {
  return dispatch => {
    dispatch(loadCategoriesAction())
    return new Promise(async(resolve, reject) => {
      try {
        const categories = await loadCutegoriesFN()
        dispatch(loadCategoriesSuccessAction(categories))
        resolve(categories)
      } catch (error) {
        dispatch(loadCategoriesFailedAction(error))
        reject(error)
      }
    })
  }
}