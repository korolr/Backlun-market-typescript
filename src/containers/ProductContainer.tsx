import React, { Component } from "react"
import { connect } from "react-redux"
import { Product } from "../components/Product"
import {
  fetchBasket,
  updateBasket,
  basketAction,
} from "../actions/basketActions"

import { ThunkDispatch } from "redux-thunk"

import { rootState } from "../reducers"

interface Props {
  toUpdateBasket: (product: number, count: number) => void;
  toGetBasket: () => void;
  login: boolean;
  basket: any[];
  match: {
    params: {
      number: number,
    },
  };
}

class ProductContainer extends Component<Props> {
  componentDidMount() {}
  render() {
    const { basket, toGetBasket, login, toUpdateBasket } = this.props
    return (
      <div>
        <Product
          basket={basket}
          getBasket={toGetBasket}
          login={login}
          updateBasket={toUpdateBasket}
          id={this.props.match.params.number}
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
    toGetBasket: () => dispatch(fetchBasket()),
    toUpdateBasket: (product: number, count: number) =>
      dispatch(updateBasket(product, count)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductContainer)
