import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

const middlewares = [
  thunkMiddleware
];
// eslint-disable-next-line no-undef
// if (process.env.NODE_ENV === "development") {
//   middlewares.push(require("redux-logger").createLogger());
// }
const enhancer = applyMiddleware(...middlewares);

export default function configStore () {
  const store = createStore(rootReducer, enhancer);
  return store;
}