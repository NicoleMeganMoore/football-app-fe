import checkPropTypes from "check-prop-types";

// uses actual store from app, to have more accurate test results
import { configureStore } from "./src/redux/modules/store";

export const storeFactory = initialState => {
  const { store } = configureStore(initialState);
  return store;
};

export const findByTestAttr = (wrapper, val) =>
  wrapper.find(`[data-test='${val}']`);

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
