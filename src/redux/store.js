import { configureStore } from "./modules/store";
import { browserHistory } from "react-router";

const initialState = window.__INITIAL_STATE__;
export const { store, persistor } = configureStore(
  initialState,
  browserHistory
);
