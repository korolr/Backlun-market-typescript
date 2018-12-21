import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import expect from "expect"
import * as t from "./registrationActions"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it("registrationReq(): test", () => {
  const expectedAction = {
    type: t.REGISTRATION_REQUEST,
  }
  expect(t.registrationReq()).toEqual(expectedAction)
})

describe("registrationStart", () => {
  describe("async actions", () => {
    it("REGISTRATION_REQUEST when all normal", () => {
      const expectedActions = [
        {
          type: t.REGISTRATION_REQUEST,
        },
        {
          type: t.REGISTRATION_SUCCESS,
        },
      ]

      const store = mockStore({})

      return store
        .dispatch(
          t.registrationStart(
            Math.random()
              .toString(36)
              .substring(7),
            "123",
            "alex",
            "Balakovo"
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it("bad params", () => {
      const expectedActions = [
        {
          type: t.REGISTRATION_REQUEST,
        },
        {
          type: t.REGISTRATION_FAIL,
          payload: "Не правильные данные",
        },
      ]

      const store = mockStore({})

      return store
        .dispatch(
          t.registrationStart(
            Math.random()
              .toString(36)
              .substring(7),
            "123",
            "alex"
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
