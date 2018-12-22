import { HTTP } from "../utils/api"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { Dispatch } from "react"

export const LOGIN_REQUEST = "LOGIN_REQUEST"

interface LOGIN_REQUEST extends Action {
  type: typeof LOGIN_REQUEST;
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"

interface LOGIN_SUCCESS extends Action {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

export const LOGIN_FAIL = "LOGIN_FAIL"

interface LOGIN_FAIL {
  type: typeof LOGIN_FAIL;
  payload: string;
}

export const LOGIN_OUT = "LOGIN_OUT"

interface LOGIN_OUT extends Action {
  type: typeof LOGIN_OUT;
}

export type loginAction = LOGIN_REQUEST | LOGIN_SUCCESS | LOGIN_FAIL | LOGIN_OUT

export function loginStart(
  login: string,
  password: string
): ThunkAction<void, null, void, loginAction> {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
    })

    HTTP.post(
      `api/auth/login`,
      {},
      {
        params: {
          login: login,
          password: password,
        },
      }
    )
      .then(function(response) {
        if (response.data.message === "Success") {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.body,
          })
        }
      })
      .catch(function(err) {
        if (err.response.data.message === "Incorrect login or password") {
          dispatch({
            type: LOGIN_FAIL,
            payload: "Ошибка при вводе пароля",
          })
        } else {
          dispatch({
            type: LOGIN_FAIL,
            payload: "Ошибка сервера",
          })
        }
      })
  }
}

export function logOut(): loginAction {
  return {
    type: LOGIN_OUT,
  }
}

export function loginReq(): loginAction {
  return {
    type: LOGIN_REQUEST,
  }
}

export function logOut403(
  err: { response: { data: { message: string } } },
  dispatch: Dispatch<loginAction>
) {
  if (err.response.data.message === "Incorrect token") {
    return dispatch({
      type: LOGIN_OUT,
    })
  }
}

export function logOutSaga403(err: {
  response: { data: { message: string } },
  message?: string,
}): any {
  if (err.message === "Incorrect token") {
    return {
      type: LOGIN_OUT,
    }
  } else if (err.response.data.message === "Incorrect token") {
    return {
      type: LOGIN_OUT,
    }
  }
}
