import * as React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import { HTTP } from "../utils/api"

type Data = Array<{
  ID: number,
  Category: number,
  Name: string,
}>

interface State {
  data: Data;
}

interface Props {
  basket: Array<{
    Product: {
      ID: number,
    },
  }>;
  loginOut: () => void;
  isLogin: boolean;
}

export class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { data: [] }
  }
  componentDidMount() {
    HTTP.get(`api/get/categories`).then(
      (response: { data: { body: Data } }) => {
        this.setState({ data: response.data.body })
      }
    )
  }
  render() {
    const { loginOut, isLogin, basket } = this.props
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Магазин</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={3} title="Категории" id="basic-nav-dropdown">
              {this.state.data.map(item => {
                return (
                  <MenuItem eventKey={3} key={item.ID}>
                    {" "}
                    <Link to={`/cat/${item.ID}`} style={{ color: "#77778c" }}>
                      {item.Name}
                    </Link>
                  </MenuItem>
                )
              })}
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            {isLogin ? (
              <React.Fragment>
                <NavItem eventKey={3} href="#">
                  <Link to="/basket" style={{ color: "#77778c" }}>
                    Корзина ({basket.length})
                  </Link>
                </NavItem>
                <NavItem eventKey={3} href="#" onClick={() => loginOut()}>
                  Выйти
                </NavItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem eventKey={3} href="#">
                  <Link to="/registration" style={{ color: "#77778c" }}>
                    Регистрация
                  </Link>
                </NavItem>
                <NavItem eventKey={3} href="#">
                  <Link to="/login" style={{ color: "#77778c" }}>
                    Войти
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default Header
