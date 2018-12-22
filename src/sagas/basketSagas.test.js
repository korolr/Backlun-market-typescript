import { put, take, call, select } from "redux-saga/effects"
import { logOutSaga403 } from "../actions/loginActions"
import {
  watchBuyBasket,
  watchFetchBasket,
  watchUpdateBasket,
} from "./basketSagas"
import sagaHelper from "redux-saga-testing"
import {
  requestBasket,
  requestBasketSuccess,
  requestBasketError,
  BASKET_BUY,
  BASKET_UPDATE,
  BASKET_FETCHED,
} from "../actions/basketActions"

const api = jest.fn(() => [])

const getToken = state => state.login.token

describe("watchBuyBasket", () => {
  describe("1 always ok", () => {
    const it = sagaHelper(watchBuyBasket())

    it("and then trigger BASKET_BUY", result => {
      expect(result).toEqual(take(BASKET_BUY))
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
      return "asfasfaf"
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return []
    })

    it("and then put requestBasketSucces", result => {
      expect(result).toEqual(put(requestBasketSuccess([])))
    })
  })

  describe("2 error", () => {
    const it = sagaHelper(watchBuyBasket())

    it("and then trigger BASKET_BUY", result => {
      expect(result).toEqual(take(BASKET_BUY))
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return new Error("Incorrect token")
    })

    it("and then put logout", result => {
      expect(result).toEqual(put(logOutSaga403(new Error("Incorrect token"))))
    })

    it("requestBasketError", result => {
      expect(result).toEqual(put(requestBasketError("Ошибка сервера")))
    })
  })
})

describe("watchFetchBasket", () => {
  describe("1 always ok", () => {
    const it = sagaHelper(watchFetchBasket())

    it("and then trigger BASKET_BUY", result => {
      expect(result).toEqual(take(BASKET_FETCHED))
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
      return "sadasdadas"
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return { data: { body: "" } }
    })

    it("and then put requestBasketSucces", result => {
      expect(result).toEqual(put(requestBasketSuccess("")))
    })
  })

  describe("clear body request", () => {
    const it = sagaHelper(watchFetchBasket())

    it("and then trigger BASKET_BUY", result => {
      expect(result).toEqual(take(BASKET_FETCHED))
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
      return "sadasdadas"
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return { data: { body: null } }
    })

    it("and then put requestBasketSucces", result => {
      expect(result).toEqual(put(requestBasketError("Пустое тело ответа")))
    })
  })

  describe("error", () => {
    const it = sagaHelper(watchFetchBasket())

    it("and then trigger BASKET_BUY", result => {
      expect(result).toEqual(take(BASKET_FETCHED))
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
      return "sadasdadas"
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return new Error("Incorrect token")
    })

    it("and then put logout", result => {
      expect(result).toEqual(put(logOutSaga403(new Error("Incorrect token"))))
    })

    it("requestBasketError", result => {
      expect(result).toEqual(put(requestBasketError("Ошибка сервера")))
    })
  })
})

describe("watchUpdateBasket", () => {
  describe("1 always ok", () => {
    const it = sagaHelper(watchUpdateBasket())

    it("and then trigger BASKET_UPDATE", result => {
      expect(result).toEqual(take(BASKET_UPDATE))
      return { product: 1, count: 1 }
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
      return "asfasfaf"
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return { data: { message: "Success" } }
    })

    it("HTTP GET2", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return { data: { body: "" } }
    })

    it("and then put requestBasketSucces", result => {
      expect(result).toEqual(put(requestBasketSuccess("")))
    })
  })

  describe("clear body", () => {
    const it = sagaHelper(watchUpdateBasket())

    it("and then trigger BASKET_UPDATE", result => {
      expect(result).toEqual(take(BASKET_UPDATE))
      return { product: 1, count: 1 }
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
      return "asfasfaf"
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return { data: { message: "Success" } }
    })

    it("HTTP GET2", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return { data: { body: null } }
    })

    it("and then put requestBasketSucces", result => {
      expect(result).toEqual(put(requestBasketError("Пустое тело ответа")))
    })
  })

  describe("error getproduct", () => {
    const it = sagaHelper(watchUpdateBasket())

    it("and then trigger BASKET_UPDATE", result => {
      expect(result).toEqual(take(BASKET_UPDATE))
      return { product: 1, count: 1 }
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
      return "asfasfaf"
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return { data: { message: "Error" } }
    })

    it("and then put requestBasketSucces", result => {
      expect(result).toEqual(
        put(requestBasketError("Ошибка в получении продукта"))
      )
    })
  })

  describe("error", () => {
    const it = sagaHelper(watchUpdateBasket())

    it("and then trigger BASKET_UPDATE", result => {
      expect(result).toEqual(take(BASKET_UPDATE))
      return { product: 1, count: 1 }
    })

    it("and then put requestBasket", result => {
      expect(result).toEqual(put(requestBasket()))
    })

    it("test select", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(select(getToken)))
      return "asfasfaf"
    })

    it("HTTP GET", result => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(() => api)))
      expect(api).not.toHaveBeenCalled()
      return new Error("Incorrect token")
    })

    it("and then put logout", result => {
      expect(result).toEqual(put(logOutSaga403(new Error("Incorrect token"))))
    })

    it("requestBasketError", result => {
      expect(result).toEqual(put(requestBasketError("Ошибка сервера")))
    })
  })
})
