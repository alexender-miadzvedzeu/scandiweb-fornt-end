import { overalTypes } from "./types";

export const loadCurrenciesAction = () => ({
  type: overalTypes.LOAD_CURRENCIES
})

export const loadCurrenciesSuccessAction = payload => ({
  type: overalTypes.LOAD_CURRENCIES_SUCCES,
  payload
})

export const loadCurrenciesFailedAction = error => ({
  type: overalTypes.LOAD_CURRENCIES_FAILED,
  error
})

export const loadCategoriesAction = () => ({
  type: overalTypes.LOAD_CATEGORIES
})

export const loadCategoriesSuccessAction = payload => ({
  type: overalTypes.LOAD_CATEGORIES_SUCCESS,
  payload
})

export const loadCategoriesFailedAction = error => ({
  type: overalTypes.LOAD_CATEGORIES_FAILED,
  error
})

export const setCurrentCategoryAction = name => ({
  type: overalTypes.SET_CURRENT_CATEGORY,
  name
})