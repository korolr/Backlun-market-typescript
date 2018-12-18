import { HTTP } from "../utils/api"
import * as React from "react"
import { Grid, Row, Button } from "react-bootstrap"
import styled from "styled-components"
import { Link } from "react-router-dom"

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

export const Product = styled.div`
  position: center;
  border: 2px;
  margin: 10px;
  width: 210px;
  text-align: center;
`

type Data = Array<{
  ID: number,
  Category: number,
  Name: string,
}>

interface State {
  data: Data;
  basket: Array<any>;
}

interface Props {
  login: boolean;
  basket: Array<{
    Product: {
      ID: number,
    },
  }>;
  updateBasket: (a: number, b: number) => void;
  getBasket: () => void;
}

export class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { data: [], basket: [] }
  }
  componentDidMount() {
    if (this.props.login) {
      this.props.getBasket()
    }
    HTTP.get(`api/get/products`).then((response: { data: { body: Data } }) => {
      this.setState({ data: response.data.body })
    })
  }
  componentWillReceiveProps(newProps: Props) {
    newProps.basket.map(item => {
      this.setState(prevState => ({
        basket: [...prevState.basket, item.Product.ID],
      }))
    })
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Content>
            {this.state.data ? (
              this.state.data.map(item => {
                return (
                  <Product key={item.ID}>
                    <Link to={`product/${item.ID}`}>
                      <h3>{item.Name}</h3>
                      <img
                        style={{ height: "200px" }}
                        src="https://avatars.mds.yandex.net/get-mpic/200316/img_id9183304286749674957.jpeg/9hq"
                      />
                    </Link>

                    {this.props.login ? (
                      this.state.basket.includes(item.ID) ? (
                        <Link to="/basket">
                          <Button bsStyle="primary">Уже в корзине</Button>
                        </Link>
                      ) : (
                        <Button
                          onClick={() => this.props.updateBasket(item.ID, 1)}
                        >
                          Добавить в корзину
                        </Button>
                      )
                    ) : (
                      <Link to="/login">
                        <Button>Добавить в корзину</Button>
                      </Link>
                    )}
                  </Product>
                )
              })
            ) : (
              <div>Нет данных</div>
            )}
          </Content>
        </Row>
      </Grid>
    )
  }
}

export default Home
