import React, { Component } from "react"
import { connect } from "react-redux"
import { Registration } from "../components/Registration"
import {
  registrationStart,
  registrationReq,
  registrationAction
} from "../actions/registrationActions"

import { ThunkDispatch } from "redux-thunk"

import { rootState } from "../reducers";

interface Props {
  toRegistration: (login: string, password: string, name: string, address: string) => void
  error: string
  success: boolean
  login: boolean
  toRegistrationReq: () => void
  
  }

class RegistrationContainer extends Component<Props> {
  render() {
    const {
      toRegistration,
      error,
      success,
      login,
      toRegistrationReq,
    } = this.props
    return (
      <div>
        <Registration
          registration={toRegistration}
          error={error}
          isLogin={login}
          success={success}
          regReq={toRegistrationReq}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: rootState) => {
  return {
    success: store.registration.success,
    error: store.registration.error,
    login: store.login.isLogin,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<null, void, registrationAction>
) => {
  return {
    toRegistration: (login: string, password: string, name: string, address: string) =>
      dispatch(registrationStart(login, password, name, address)),
    toRegistrationReq: () => dispatch(registrationReq()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer)
