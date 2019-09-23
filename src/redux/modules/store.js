import { applyMiddleware, compose, createStore } from "redux";

// Redux Persist
import { persistStore } from "redux-persist";
import { routerMiddleware } from "react-router-redux";

import rootReducer from "../rootReducer";

import Thunk from "redux-thunk";

// Logger with default options
// import logger from "redux-logger";

export const configureStore = (initialState = {}, history) => {
  const middlewares = [
    // logger,
    routerMiddleware(history),
    Thunk
  ];

  let middleware = applyMiddleware(...middlewares);

  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 50 })
    : require("../../containers/DevTools").default.instrument({ maxAge: 50 });

  middleware = compose(
    middleware,
    devTools
  );

  const store = middleware(createStore)(rootReducer, initialState);

  const persistor = persistStore(store, () => {
    store.getState();
  });

  return { store, persistor };
};
