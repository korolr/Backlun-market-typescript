import React, { Component } from "react"
import { connect } from "react-redux"
import { Header } from "../components/Header"
import { logOut } from "../actions/loginActions"
import { fetchBasket, basketAction } from "../actions/basketActions"
import { loginAction } from "../actions/loginActions"
import { ThunkDispatch } from "redux-thunk"

import { rootState } from "../reducers"

interface Props {
  toLoginOut: () => void;
  login: boolean;
  basket: any[];
}

class HeadContainer extends Component<Props> {
  componentWillReceiveProps() {}
  render() {
    const { toLoginOut, login, basket } = this.props
    return <Header loginOut={toLoginOut} isLogin={login} basket={basket} />
  }
}

const mapStateToProps = (store: rootState) => {
  return {
    login: store.login.isLogin,
    basket: store.basket.data,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<rootState, void, basketAction | loginAction>
) => {
  return {
    toLoginOut: () => dispatch(logOut()),
    toGetBasket: () => dispatch(fetchBasket()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadContainer)
