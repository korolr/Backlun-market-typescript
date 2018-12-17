import React, { Component } from "react"
import { connect } from "react-redux"
import { Basket } from "../components/Basket"
import {
  updateBasket,
  buyBasket,
  clearBasket,
  basketAction,
} from "../actions/basketActions"
import { ThunkDispatch } from "redux-thunk"

import { rootState } from "../reducers"

interface Props {
  toUpdateBasket: (product: number, count: number) => void;
  toBuyBasket: () => void;
  toClearBasket: () => void;
  basket: any[];
}

class BasketContainer extends Component<Props> {
  render() {
    const { toUpdateBasket, toBuyBasket, basket, toClearBasket } = this.props
    return (
      <div>
        <Basket
          updateBasket={toUpdateBasket}
          basket={basket}
          buyBasket={toBuyBasket}
          clearBasket={toClearBasket}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: rootState) => {
  return {
    basket: store.basket.data,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<rootState, void, basketAction>
) => {
  return {
    toUpdateBasket: (product: number, count: number) =>
      dispatch(updateBasket(product, count)),
    toBuyBasket: () => dispatch(buyBasket()),
    toClearBasket: () => dispatch(clearBasket()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketContainer)
