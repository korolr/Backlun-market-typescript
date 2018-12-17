import React, { Component } from "react"
import { connect } from "react-redux"
import { Home } from "../components/Home"
import { getBasket, updateBasket, basketAction } from "../actions/basketActions"
import { ThunkDispatch } from "redux-thunk"

import { rootState } from "../reducers";

interface Props {
  toUpdateBasket: (product: number, count: number) => void
  login: boolean
  toGetBasket: () => void
  basket: any[]
}

class HomeContainer extends Component<Props> {
  componentDidMount() {}
  render() {
    const { basket, toGetBasket, login, toUpdateBasket } = this.props
    return (
      <div>
        <Home
          basket={basket}
          getBasket={toGetBasket}
          login={login}
          updateBasket={toUpdateBasket}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: rootState) => {
  return {
    basket: store.basket.data,
    login: store.login.isLogin,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<rootState, void, basketAction>
 ) => {
  return {
    toGetBasket: () => dispatch(getBasket()),
    toUpdateBasket: (product:number, count: number) => dispatch(updateBasket(product, count)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
