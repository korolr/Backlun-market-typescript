import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  registrationAction,
} from "../actions/registrationActions"

export interface StoreStateReg {
  success: boolean;
  error: string;
}

const initialState: StoreStateReg = {
  success: false,
  error: "",
}

export function registrationReducer(
  state: StoreStateReg = initialState,
  action: registrationAction
): StoreStateReg {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return { ...state, error: "", success: false }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        success: true,
      }
    case REGISTRATION_FAIL:
      return { ...state, error: action.payload, success: false }

    default:
      return state
  }
}
