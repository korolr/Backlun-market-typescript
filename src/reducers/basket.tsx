import {
  BASKET_REQUEST,
  BASKET_SUCCESS,
  BASKET_FAIL,
  BASKET_CLEAR,
  basketAction,
} from "../actions/basketActions"

export interface StoreStateBasket {
  data: Array<any>;
  error: string;
}

const initialState: StoreStateBasket = {
  data: [],
  error: "",
}

export function basketReducer(
  state: StoreStateBasket = initialState,
  action: basketAction
): StoreStateBasket {
  switch (action.type) {
    case BASKET_REQUEST:
      return { ...state, error: "" }
    case BASKET_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case BASKET_FAIL:
      return { ...state, error: action.payload }
    case BASKET_CLEAR:
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}
