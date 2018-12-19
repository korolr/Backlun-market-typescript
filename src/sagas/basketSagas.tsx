import { HTTP } from "../utils/api"
import { logOutSaga403 } from "../actions/loginActions"
import { rootState } from "../reducers"
import {
  requestBasket,
  requestBasketSuccess,
  requestBasketError,
  BASKET_BUY,
  BASKET_UPDATE,
  BASKET_FETCHED,
} from "../actions/basketActions"
import { call, put, takeEvery, select, ForkEffect } from "redux-saga/effects"

const getToken = (state: rootState) => state.login.token

export function* watchBuyBasket(): IterableIterator<ForkEffect> {
  yield takeEvery(BASKET_BUY, buyBasketAsync)
}

export function* buyBasketAsync() {
  try {
    yield put(requestBasket())
    const token = yield select(getToken)
    const basket = yield call(() => {
      return HTTP.post(
        `api/market/pay`,
        {},
        {
          params: {
            token: token,
          },
        }
      ).then(response => {
        return []
      })
    })
    yield put(requestBasketSuccess(basket))
  } catch (error) {
    yield put(logOutSaga403(error))
    yield put(requestBasketError("Ошибка сервера"))
  }
}

export function* watchUpdateBasket(): IterableIterator<ForkEffect> {
  yield takeEvery(BASKET_UPDATE, updateBasketAsync)
}

export function* updateBasketAsync(action: any) {
  try {
    yield console.log(action)
    yield put(requestBasket())
    const token = yield select(getToken)
    const count = yield call(() => {
      return HTTP.post(
        `api/market/products`,
        {},
        {
          params: {
            token: token,
            product: action.payload.product,
            count: action.payload.count,
          },
        }
      ).then(response => {
        return response
      })
    })
    if (count.data.message === "Success") {
      const basket = yield call(() => {
        return HTTP.get(`api/get/backet`, {
          params: {
            token: token,
          },
        }).then(response => {
          return response
        })
      })
      if (basket.data.body !== null) {
        yield put(requestBasketSuccess(basket.data.body))
      } else {
        yield put(requestBasketError("Пустое тело ответа"))
      }
    } else {
      yield put(requestBasketError("Ошибка в получении продукта"))
    }
  } catch (error) {
    yield put(logOutSaga403(error))
    yield put(requestBasketError("Ошибка сервера"))
  }
}

export function* watchFetchBasket(): IterableIterator<ForkEffect> {
  yield takeEvery(BASKET_FETCHED, fetchBasketAsync)
}

function* fetchBasketAsync() {
  try {
    yield put(requestBasket())
    const token = yield select(getToken)
    const basket = yield call(() => {
      return HTTP.get(`api/get/backet`, {
        params: {
          token: token,
        },
      }).then(response => {
        return response
      })
    })
    if (basket.data.body !== null) {
      yield put(requestBasketSuccess(basket.data.body))
    } else {
      yield put(requestBasketError("Пустое тело ответа"))
    }
  } catch (error) {
    yield put(logOutSaga403(error))
    yield put(requestBasketError("Ошибка сервера"))
  }
}
