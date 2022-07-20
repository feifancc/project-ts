import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import queryArticleReducer from "./reducers/article";
import { loginReducer } from "./reducers/login";

const allReducer = combineReducers({
  token: loginReducer,
  article: queryArticleReducer,
});

export default createStore(allReducer, applyMiddleware(thunk));
