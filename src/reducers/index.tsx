import { combineReducers } from "redux"
import { loginReducer, StoreStateLogin } from "./login"
import { registrationReducer, StoreStateReg } from "./registration"
import { basketReducer, StoreStateBasket } from "./basket"

export interface rootState {
  login: StoreStateLogin;
  registration: StoreStateReg;
  basket: StoreStateBasket;
}
export const rootReducer = combineReducers({
  login: loginReducer,

  registration: registrationReducer,
  basket: basketReducer,
})
