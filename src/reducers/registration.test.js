import { initialState, registrationReducer } from "./registration"
import * as t from "../actions/registrationActions"

describe("news reducer", () => {
  it("REGISTRATION_REQUEST", () => {
    const action = {
      type: t.REGISTRATION_REQUEST,
    }

    expect(registrationReducer(initialState, action)).toEqual({
      ...initialState,
      error: "",
      success: false,
    })
  })

  it("REGISTRATION_SUCCES", () => {
    const action = {
      type: t.REGISTRATION_SUCCESS,
    }

    expect(registrationReducer(initialState, action)).toEqual({
      ...initialState,
      error: "",
      success: true,
    })
  })

  it("REGISTRATION_FAIL", () => {
    const action = {
      type: t.REGISTRATION_FAIL,
      payload: "error",
    }

    expect(registrationReducer(initialState, action)).toEqual({
      ...initialState,
      error: "error",
      success: false,
    })
  })
})
