import React, { Component } from "react"
import { connect } from "react-redux"
import { Login } from "../components/Login"
import { loginStart, loginReq, loginAction } from "../actions/loginActions"
import { ThunkDispatch } from "redux-thunk"

import { rootState } from "../reducers"

interface Props {
  toLogin: (product: string, count: string) => void;
  login: boolean;
  toLoginReq: () => void;
  error: string;
}

class LoginContainer extends Component<Props> {
  render() {
    const { toLogin, login, toLoginReq, error } = this.props
    return (
      <div>
        <Login
          login={toLogin}
          error={error}
          isLogin={login}
          loginReq={toLoginReq}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: rootState) => {
  return {
    error: store.login.error,
    login: store.login.isLogin,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<null, void, loginAction>
) => {
  return {
    toLogin: (email: string, password: string) =>
      dispatch(loginStart(email, password)),
    toLoginReq: () => dispatch(loginReq()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
