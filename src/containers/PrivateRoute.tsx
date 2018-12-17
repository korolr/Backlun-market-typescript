import React from "react"
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom"
import { connect } from "react-redux"
import { rootState } from "../reducers"

interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuth: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuth, ...rest } = props

  return (
    <Route
      {...rest}
      render={(routeProps: RouteComponentProps<any>): React.ReactNode =>
        isAuth ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = (store: rootState) => {
  return {
    isAuth: store.login.isLogin,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
