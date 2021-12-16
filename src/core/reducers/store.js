import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import overalReducer from "./overal";
import productsReducer from "./porducts";

const reducers = combineReducers({
  overalReducer,
  productsReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;