import React from "react";
import { shallow } from "enzyme";

import { RegisterForm } from "./index";

import { findByTestAttr, checkProps, storeFactory } from "../../../testUtils";

import "../../../setupTests";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<RegisterForm store={store} />)
    .dive()
    .dive();

  return wrapper;
};

describe("render", () => {
  test("renders text inputs without error", () => {
    const wrapper = setup();
    expect(wrapper.find('input[type="text"]').length).toBe(3);
  });
  test("renders password inputs without error", () => {
    const wrapper = setup();
    expect(wrapper.find('input[type="password"]').length).toBe(2);
  });
});

describe("input tests", () => {
  let wrapper;
  test("first name state updates onchange", () => {
    wrapper = setup();
    wrapper.find('input[name="first-name"]').simulate("change", {
      target: { value: "nikki" }
    });
    expect(wrapper.state("firstNameInput")).toEqual("nikki");
  });

  test("last name state updates onchange", () => {
    wrapper = setup();
    wrapper.find('input[name="last-name"]').simulate("change", {
      target: { value: "moore" }
    });
    expect(wrapper.state("lastNameInput")).toEqual("moore");
  });

  test("email state updates onchange", () => {
    wrapper = setup();
    wrapper.find('input[name="email"]').simulate("change", {
      target: { value: "test@gmail.com" }
    });
    expect(wrapper.state("emailInput")).toEqual("test@gmail.com");
  });

  test("password state updates onchange", () => {
    wrapper = setup();
    wrapper.find('input[name="password"]').simulate("change", {
      target: { value: "password123" }
    });
    expect(wrapper.state("passwordInput")).toEqual("password123");
  });

  test("confirm password state updates onchange", () => {
    wrapper = setup();
    wrapper.find('input[name="confirm-password"]').simulate("change", {
      target: { value: "password123" }
    });
    expect(wrapper.state("passwordConfirmInput")).toEqual("password123");
  });

  test("throw error when passwords are different", () => {
    wrapper = setup();
    wrapper.find('input[name="password"]').simulate("change", {
      target: { value: "password123" }
    });
    wrapper.find('input[name="confirm-password"]').simulate("change", {
      target: { value: "password12345" }
    });

    expect(findByTestAttr(wrapper, "input-validation-error").length).toBe(1);
  });

  test("throw error when email is invalid", () => {
    wrapper = setup();
    wrapper.find('input[name="email"]').simulate("change", {
      target: { value: "" }
    });

    expect(findByTestAttr(wrapper, "input-validation-error").length).toBe(1);
  });

  test("throw errors when all inputs are empty", () => {
    wrapper = setup();
    wrapper.find('input[name="first-name"]').simulate("change", {
      target: { value: "" }
    });
    wrapper.find('input[name="last-name"]').simulate("change", {
      target: { value: "" }
    });
    wrapper.find('input[name="email"]').simulate("change", {
      target: { value: "" }
    });
    wrapper.find('input[name="password"]').simulate("change", {
      target: { value: "" }
    });
    wrapper.find('input[name="confirm-password"]').simulate("change", {
      target: { value: "" }
    });

    expect(findByTestAttr(wrapper, "input-validation-error").length).toBe(4);
  });
});
