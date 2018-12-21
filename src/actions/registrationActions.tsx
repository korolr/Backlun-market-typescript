import { HTTP } from "../utils/api"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { Dispatch } from "react"

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST"

interface REGISTRATION_REQUEST extends Action {
  type: typeof REGISTRATION_REQUEST;
}

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS"

interface REGISTRATION_SUCCESS extends Action {
  type: typeof REGISTRATION_SUCCESS;
}

export const REGISTRATION_FAIL = "REGISTRATION_FAIL"

interface REGISTRATION_FAIL extends Action {
  type: typeof REGISTRATION_FAIL;
  payload: string;
}

export type registrationAction =
  | REGISTRATION_REQUEST
  | REGISTRATION_SUCCESS
  | REGISTRATION_FAIL

export function registrationStart(
  login: string,
  password: string,
  name: string,
  address: string
): ThunkAction<void, null, void, registrationAction> {
  return dispatch => {
    dispatch({
      type: REGISTRATION_REQUEST,
    })

    return HTTP.post(
      `/api/auth/registration`,
      {},
      {
        params: {
          login: login,
          password: password,
          name: name,
          address: address,
        },
      }
    )
      .then(function(response) {
        if (response.data.message === "Success") {
          dispatch({
            type: REGISTRATION_SUCCESS,
          })
        }
      })
      .catch(function(err) {
        if (err.response.data.message === "User with this login is exists") {
          dispatch({
            type: REGISTRATION_FAIL,
            payload: "Такой пользователь уже есть",
          })
        } else if (err.response.data.message === "Incorrect data") {
          dispatch({
            type: REGISTRATION_FAIL,
            payload: "Не правильные данные",
          })
        } else {
          dispatch({
            type: REGISTRATION_FAIL,
            payload: "Ошибка сервера",
          })
        }
      })
  }
}

export function registrationReq(): registrationAction {
  return {
    type: REGISTRATION_REQUEST,
  }
}
