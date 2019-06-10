import React from 'react';
import axios from 'axios';
import { Form, List, Header } from 'semantic-ui-react';

class OrderForm extends React.Component {
  date = new Date();

  state = {
    quantity: 1,
    recipe: null,
    cost: 0,
    expectedDelivery: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7),
    orders: null,
  }

  componentDidMount() {
    this.props.setHeader('Order Form');
    axios({
      method: 'get',
      url: `http://localhost:4000/api/v1/recipes/${this.props.match.params.recipeId}`
    })
      .then(response => {
        this.setState({
          recipe: response.data,
          cost: response.data.price,
        });
      })
      .catch(err => console.log(err));
  }

  handleSubmit = e => {
    e.preventDefault();
    if (localStorage.token) {
      axios({
        method: 'post',
        url: `http://localhost:4000/auth/user/orders`,
        headers: { authorization: `Bearer ${localStorage.token}` },
        data: {
          expectedDelivery: this.state.expectedDelivery,
          quantity: this.state.quantity,
          paid: this.state.cost,
          RecipeId: this.state.recipe.id,
          UserId: this.props.user.id
        }
      })
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(err => console.log(err));
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      cost: e.target.value * this.state.recipe.price,
    });

  }

  render() {
    const { quantity, recipe, cost, expectedDelivery, orders } = this.state;
    const { user } = this.props;
    return (
      <div>
        {!(orders) ? (
          <>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group inline>
                <Form.Input width={2} fluid id='quantity' name='quantity' type='number' min='1' max='10' value={quantity} onChange={this.handleInput} /> dozen {(recipe) && <>{recipe.name}</>} cookies for ${cost}
              </Form.Group>
              <Form.Button content='Place your order' />
            </Form>
            {(user) &&
              <>
                <Header as="h3">Shipping to:</Header>
                <List>
                  <List.Item>{user.name}</List.Item>
                  <List.Item>{user.street1}</List.Item>
                  {(user.street2 )&& <List.Item>{user.street2}</List.Item> }
                  <List.Item>{user.city}, {user.state}</List.Item>
                  <List.Item>{user.postalCode}</List.Item>
                  </List>
              </>
            }
        </>
      ) : (

        <div>
        Thanks for the order of  dozen {(recipe) && <>{recipe.name}</>} cookies! You can expect delivery by {expectedDelivery.toLocaleDateString()}.

        Order #{orders.id}
        </div>
      )}
      </div>
    )
  }
}

export default OrderForm;
