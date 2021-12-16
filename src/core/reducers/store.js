import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import overalReducer from "./overal";

const reducers = combineReducers({
  overalReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
  );

export default store;