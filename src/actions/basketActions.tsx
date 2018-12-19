import { Action } from "redux"

export const BASKET_REQUEST = "BASKET_REQUEST"

interface BASKET_REQUEST extends Action {
  type: typeof BASKET_REQUEST;
}

export const BASKET_SUCCESS = "BASKET_SUCCESS"

interface BASKET_SUCCESS extends Action {
  type: typeof BASKET_SUCCESS;
  payload: any;
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

export const BASKET_FETCHED = "BASKET_FETCHED"

interface BASKET_FETCHED extends Action {
  type: typeof BASKET_FETCHED;
}

export const BASKET_UPDATE = "BASKET_UPDATE"

interface BASKET_UPDATE extends Action {
  type: typeof BASKET_UPDATE;
  payload: {
    product: number,
    count: number,
  };
}

export const BASKET_BUY = "BASKET_BUY"

interface BASKET_BUY extends Action {
  type: typeof BASKET_BUY;
}

export type basketAction =
  | BASKET_REQUEST
  | BASKET_SUCCESS
  | BASKET_FAIL
  | BASKET_CLEAR
  | BASKET_FETCHED
  | BASKET_UPDATE
  | BASKET_BUY

export function clearBasket(): BASKET_CLEAR {
  return {
    type: BASKET_CLEAR,
    payload: [],
  }
}

export function requestBasket(): BASKET_REQUEST {
  return { type: BASKET_REQUEST }
}

export function requestBasketSuccess(data: string): BASKET_SUCCESS {
  return { type: BASKET_SUCCESS, payload: data }
}

export function requestBasketError(err: string): BASKET_FAIL {
  return { type: BASKET_FAIL, payload: err }
}

export function fetchBasket(): BASKET_FETCHED {
  return { type: BASKET_FETCHED }
}

export function updateBasket(product: number, count: number): BASKET_UPDATE {
  const action = {
    product: product,
    count: count,
  }
  return { type: BASKET_UPDATE, payload: action }
}

export function buyBasket(): BASKET_BUY {
  return { type: BASKET_BUY }
}
