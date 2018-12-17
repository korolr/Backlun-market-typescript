import { HTTP } from "../utils/api"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { logOut403 } from "./loginActions"
import { rootState } from "../reducers"

export const BASKET_REQUEST = "BASKET_REQUEST"

interface BASKET_REQUEST extends Action {
  type: typeof BASKET_REQUEST;
}

export const BASKET_SUCCESS = "BASKET_SUCCESS"

interface BASKET_SUCCESS extends Action {
  type: typeof BASKET_SUCCESS;
  payload: Array<any>;
}

export const BASKET_FAIL = "BASKET_FAIL"

interface BASKET_FAIL extends Action {
  type: typeof BASKET_FAIL;
  payload: string;
}

export const BASKET_CLEAR = "BASKET_CLEAR"

interface BASKET_CLEAR extends Action {
  type: typeof BASKET_CLEAR;
  payload: Array<any>;
}

export type basketAction =
  | BASKET_REQUEST
  | BASKET_SUCCESS
  | BASKET_FAIL
  | BASKET_CLEAR

export function getBasket(): ThunkAction<void, rootState, void, basketAction> {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: BASKET_REQUEST,
    })

    HTTP.get(`api/get/backet`, {
      params: {
        token: state.login.token,
      },
    })
      .then(function(response) {
        if (response.data.body !== null) {
          dispatch({
            type: BASKET_SUCCESS,
            payload: response.data.body,
          })
        }
      })
      .catch(function(err) {
        logOut403(err, dispatch)
        dispatch({
          type: BASKET_FAIL,
          payload: "Ошибка сервера",
        })
      })
  }
}

export function updateBasket(
  product: number,
  count: number
): ThunkAction<void, rootState, void, basketAction> {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: BASKET_REQUEST,
    })

    HTTP.post(
      `api/market/products`,
      {},
      {
        params: {
          token: state.login.token,
          product: product,
          count: count,
        },
      }
    )
      .then(function(response) {
        if (response.data.message === "Success") {
          HTTP.get(`api/get/backet`, {
            params: {
              token: state.login.token,
            },
          }).then(function(response) {
            if (response.data.body !== null) {
              dispatch({
                type: BASKET_SUCCESS,
                payload: response.data.body,
              })
            }
          })
        }
      })
      .catch(function(err) {
        logOut403(err, dispatch)
        dispatch({
          type: BASKET_FAIL,
          payload: "Ошибка сервера",
        })
      })
  }
}

export function buyBasket(): ThunkAction<void, rootState, void, basketAction> {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: BASKET_REQUEST,
    })

    HTTP.post(
      `api/market/pay`,
      {},
      {
        params: {
          token: state.login.token,
        },
      }
    )
      .then(function(response) {
        dispatch({
          type: BASKET_SUCCESS,
          payload: [],
        })
      })
      .catch(function(err) {
        logOut403(err, dispatch)
        dispatch({
          type: BASKET_FAIL,
          payload: "Ошибка сервера",
        })
      })
  }
}

export function clearBasket(): BASKET_CLEAR {
  return {
    type: BASKET_CLEAR,
    payload: [],
  }
}
