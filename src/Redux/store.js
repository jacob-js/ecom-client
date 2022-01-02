import { combineReducers, createStore } from "redux";
import initialStates from "./initialStates";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(combineReducers(reducers), initialStates, composeWithDevTools());

export default store;