import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  registrationAction,
} from "../actions/registrationActions"

export interface StoreState {
  success: boolean;
  error: string;
}

const initialState: StoreState = {
  success: false,
  error: "",
}

export function registrationReducer(
  state: StoreState = initialState,
  action: registrationAction
): StoreState {
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
