import React from "react"
import { shallow } from "enzyme"

import { Header } from "./Header"

describe("Header", () => {
  const props = {
    basket: [
      {
        Product: {
          ID: 1,
        },
      },
      {
        Product: {
          ID: 3,
        },
      },
      {
        Product: {
          ID: 7,
        },
      },
    ],
    isLogin: true,
    onGetNews: () => {},
  }

  const state = {
    data: [
      { ID: 1, Category: 2, Name: "test" },
      { ID: 2, Category: 3, Name: "test2" },
      { ID: 2, Category: 3, Name: "test2" },
    ],
  }

  describe("News container initial login true", () => {
    const headerContainer = shallow(<Header {...props} />)

    it("no item", () => {
      expect(headerContainer.find("Link")).toHaveLength(2)
    })

    it("has item", () => {
      headerContainer.setState(state)
      expect(headerContainer.find("Link")).toHaveLength(5)
      expect(
        headerContainer
          .find("Link")
          .last()
          .prop("children")
      ).toEqual(["Корзина (", 3, ")"])
    })
  })

  describe("News container initial login false", () => {
    const headerContainer = shallow(<Header {...props} />)
    headerContainer.setProps({ isLogin: false })

    it("no item", () => {
      expect(headerContainer.find("Link")).toHaveLength(3)
      expect(
        headerContainer
          .find("Link")
          .at(1)
          .prop("children")
      ).toEqual("Регистрация")
      expect(
        headerContainer
          .find("Link")
          .at(2)
          .prop("children")
      ).toEqual("Войти")
    })

    it("has item", () => {
      headerContainer.setState(state)
      expect(headerContainer.find("Link")).toHaveLength(6)
    })
  })
})
