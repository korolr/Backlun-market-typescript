import * as React from "react"
import {
  Grid,
  Row,
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
} from "react-bootstrap"
import history from "../history"

interface State {
  login: string;
  password: string;
}

interface Props {
  login: (a: string, b: string) => void;
  isLogin: boolean;
  error: string;
  loginReq: () => void;
}

export class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { login: "", password: "" }
  }

  onLoginChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ login: event.currentTarget.value })
  }

  onPasswordChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ password: event.currentTarget.value })
  }

  handleSubmit = (event: React.FormEvent<Form>) => {
    this.props.login(this.state.login, this.state.password)
    this.setState({ password: "" })
    event.preventDefault()
  }

  componentDidUpdate() {
    if (this.props.isLogin) {
      history.push(`/`)
    }
  }

  componentDidMount() {
    if (this.props.isLogin) {
      history.push(`/`)
    }
    this.props.loginReq()
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formHorizontalLogin">
              <Col sm={1}>Login</Col>
              <Col sm={3}>
                <FormControl
                  placeholder="Login"
                  value={this.state.login}
                  onChange={this.onLoginChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col sm={1}>Password</Col>
              <Col sm={3}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </Col>
            </FormGroup>

            {this.props.error ? (
              <h3 style={{ color: "red" }}>{this.props.error}</h3>
            ) : null}
            {this.state.password && this.state.login ? (
              <FormGroup>
                <Col smOffset={1} sm={3}>
                  <Button type="submit">Sign in</Button>
                </Col>
              </FormGroup>
            ) : null}
          </Form>
        </Row>
      </Grid>
    )
  }
}

export default Login
