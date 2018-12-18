import { HTTP } from "../utils/api"
import * as React from "react"
import { Grid, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

interface Data {
  Name?: string;
  Description?: string;
  Count?: number;
  ID: number;
}

interface State {
  data: Data;
  basket: Array<any>;
}

interface Props {
  id: number;
  login: boolean;
  getBasket: () => void;
  basket: Array<{ Product: { ID: number } }>;
  updateBasket: (a: number, b: number) => void;
}

export class Product extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { data: { ID: 0 }, basket: [] }
  }

  componentDidMount() {
    if (this.props.login) {
      this.props.getBasket()
    }
    HTTP.get(`/api/get/product`, {
      params: {
        id: this.props.id,
      },
    }).then(
      (response: { data: { body: Data } }) => {
        this.setState({ data: response.data.body })
      }
    )
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
          <h1>{this.state.data.Name}</h1>
          <img
            style={{ height: "300px" }}
            src="https://avatars.mds.yandex.net/get-mpic/200316/img_id9183304286749674957.jpeg/9hq"
          />
          <p>{this.state.data.Description}</p>
          <h2>{this.state.data.Count}</h2>
          {this.props.login ? (
            this.state.basket.includes(this.state.data.ID) ? (
              <Link to="/basket">
                <Button bsStyle="primary">Уже в корзине</Button>
              </Link>
            ) : (
              <Button
                onClick={() => this.props.updateBasket(this.state.data.ID, 1)}
              >
                Добавить в корзину
              </Button>
            )
          ) : (
            <Link to="/login">
              <Button>Добавить в корзину</Button>
            </Link>
          )}
        </Row>
      </Grid>
    )
  }
}

export default Product
