import React from "react";
import { shallow } from "enzyme";

import { LoginForm } from "./index";

import { findByTestAttr, checkProps, storeFactory } from "../../../testUtils";

import "../../../setupTests";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<LoginForm store={store} />)
    .dive()
    .dive();

  return wrapper;
};

describe("render", () => {
  test("renders without error", () => {
    const wrapper = setup();
    expect(wrapper.find('input[type="text"]').length).toBe(1);
  });
});

describe("input tests", () => {
  let wrapper;
  test("email state updates onchange", () => {
    wrapper = setup();
    wrapper.find('input[type="text"]').simulate("change", {
      target: { name: "email", value: "test@gmail.com" }
    });
    expect(wrapper.state("emailInput")).toEqual("test@gmail.com");
  });

  test("password state updates onchange", () => {
    wrapper = setup();
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "passwordInput", value: "password123" }
    });
    expect(wrapper.state("passwordInput")).toEqual("password123");
  });

  test("no validation errors with content in both inputs", async () => {
    wrapper = setup();
    wrapper.find('input[type="text"]').simulate("change", {
      target: { name: "email", value: "test@gmail.com" }
    });
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "password123" }
    });

    const loginButton = findByTestAttr(wrapper, "form-submit-button");
    loginButton.simulate("click");

    const errorMessages = findByTestAttr(wrapper, "input-validation-error");
    expect(errorMessages.length).toBe(0);
  });

  test("validation error with empty email", async () => {
    wrapper = setup();
    wrapper.find('input[type="text"]').simulate("change", {
      target: { name: "email", value: "" }
    });
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "password123" }
    });

    const loginButton = findByTestAttr(wrapper, "form-submit-button");
    loginButton.simulate("click");

    const errorMessages = findByTestAttr(wrapper, "input-validation-error");
    expect(errorMessages.length).toBe(1);
  });

  test("validation error with empty password", async () => {
    wrapper = setup();
    wrapper.find('input[type="text"]').simulate("change", {
      target: { name: "email", value: "test@gmail.com" }
    });
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "" }
    });

    const loginButton = findByTestAttr(wrapper, "form-submit-button");
    loginButton.simulate("click");

    const errorMessages = findByTestAttr(wrapper, "input-validation-error");
    expect(errorMessages.length).toBe(1);
  });

  test("validation errors with empty email and password", async () => {
    wrapper = setup();
    wrapper.find('input[type="text"]').simulate("change", {
      target: { name: "email", value: "" }
    });
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "" }
    });

    const loginButton = findByTestAttr(wrapper, "form-submit-button");
    loginButton.simulate("click");

    const errorMessages = findByTestAttr(wrapper, "input-validation-error");
    expect(errorMessages.length).toBe(2);
  });
});
