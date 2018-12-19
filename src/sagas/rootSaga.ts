import { all } from "redux-saga/effects"
import {
  watchFetchBasket,
  watchUpdateBasket,
  watchBuyBasket,
} from "./basketSagas"
export function* rootSaga() {
  yield all([watchUpdateBasket(), watchBuyBasket(), watchFetchBasket()])
}
