import React from "react"
import { shallow } from "enzyme"

import { Registration } from "./Registration"

describe("Registration", () => {
  const props = {
    registration: (login, password, name, adress) => {},
    error: "",
    success: false,
    isLogin: false,
    regReq: () => {},
  }

  describe("Registration container initial login fasle", () => {
    const headerContainer = shallow(<Registration {...props} />)

    it("4 control", () => {
      expect(headerContainer.find("FormControl")).toHaveLength(4)
      expect(headerContainer.find("Button")).toHaveLength(0)
    })

    it("test registration", () => {
      //test login
      headerContainer
        .find("FormControl")
        .at(0)
        .simulate("change", { currentTarget: { value: "blane" } })
      expect(headerContainer.state("login")).toEqual("blane")
      // test password
      headerContainer
        .find("FormControl")
        .at(1)
        .simulate("change", { currentTarget: { value: "123" } })
      expect(headerContainer.state("password")).toEqual("123")
      // test Name
      headerContainer
        .find("FormControl")
        .at(2)
        .simulate("change", { currentTarget: { value: "Alex" } })
      expect(headerContainer.state("name")).toEqual("Alex")
      // test Adress
      headerContainer
        .find("FormControl")
        .at(3)
        .simulate("change", { currentTarget: { value: "Balakovo" } })
      expect(headerContainer.state("address")).toEqual("Balakovo")
      // test button
      expect(headerContainer.find("Button")).toHaveLength(1)
    })
  })
})
