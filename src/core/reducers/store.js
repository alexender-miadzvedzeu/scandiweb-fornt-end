import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import overalReducer from "./overal";
import productsReducer from "./porducts";
import cartReducer from "./cart";

const reducers = combineReducers({
  overalReducer,
  productsReducer,
  cartReducer 
})

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

window.store = store;

export default store;