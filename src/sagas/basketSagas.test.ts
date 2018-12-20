import { put, take, call } from "redux-saga/effects"
import { cloneableGenerator } from "redux-saga/utils"
import { watchBuyBasket } from "./basketSagas"
import { HTTP } from "../utils/api"

describe("watchBuyBasket", () => {
  const gen = cloneableGenerator(watchBuyBasket)()
  gen.next() // BASKET_BUY
  gen.next() // BASKET_REQUEST

  test("test take", () => {
    expect(gen.next().value)
  })

  // test("test http", () => {
  //   expect(gen.next().value).toEqual(
  //     call(() => {
  //       return HTTP.post(
  //         `api/market/pay`,
  //         {},
  //         {
  //           params: {
  //             token: "2312313123123",
  //           },
  //         }
  //       ).then(response => {
  //         return []
  //       })
  //     })
  //   )
  // })
})
