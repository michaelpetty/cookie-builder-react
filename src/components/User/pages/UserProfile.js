import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header, List, Table, Accordion, Popup, Menu, Message } from 'semantic-ui-react';

class UserProfile extends React.Component {
  state = {
    orders: [],
  }

  componentDidMount() {
    if (localStorage.token) {
      axios({
        method: 'get',
        url: `http://localhost:4000/auth/user/orders`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(err => console.log(err));
    }
  }


  // displayDeets = user => {
  //   return recipes.map((recipe, i) => (<List.Item  key={i}>{recipe.Recipe.name}</List.Item>))
  // }

  displayFaves = faves => {
    return faves.map((fave, i) => (<List.Item  key={i}><Popup trigger={<Link to={`/recipe/${fave.Recipe.id}`}>{fave.Recipe.name}</Link>} hoverable position="right center">
    <Menu vertical>
      <Menu.Item><Link to={`/recipe/1`}>Recipe</Link></Menu.Item>
      <Menu.Item><Link to={`/recipe/1`}>Order</Link><br/>
      @ ${fave.Recipe.price}/dozen</Menu.Item>
      <Menu.Item><Link to={`/recipe/1`}>Fave</Link></Menu.Item>
      </Menu>
      </Popup></List.Item>))
  }

  formatDate = inp => {
    return ((typeof inp === 'string')? new Date(inp): inp).toLocaleDateString();
  }

  displayDelivery = order => {
    if (order.deliveredOn) {
      return `Delivered: ${this.formatDate(order.deliveredOn)}`;
    } else {
      return (<Message color="green">Expected: {this.formatDate(order.expectedDelivery)}</Message>);
    }
  }

  buildOrderTables = orders => {
    return orders.map((order, i) => {
      return {
        key: i,
        title: `Details from order on ${this.formatDate(order.createdAt)}`,
        content: {
          content: (
            <Table singleLine key={i}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Cookies</Table.HeaderCell>
                  <Table.HeaderCell>Paid</Table.HeaderCell>
                  <Table.HeaderCell>Ordered On</Table.HeaderCell>
                  <Table.HeaderCell>Delivery</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{order.quantity} dozen</Table.Cell>
                  <Table.Cell><Link to={`/recipe/${order.Recipe.id}`}>{order.Recipe.name}</Link></Table.Cell>
                  <Table.Cell>${order.paid}</Table.Cell>
                  <Table.Cell>{this.formatDate(order.createdAt)}</Table.Cell>
                  <Table.Cell>{this.displayDelivery(order)}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )
        }
      }
    })
  }

  render() {
    const { user, faves } = this.props;
    const { orders } = this.state;
    return (
      <>
        <Header as="h2">Your Info</Header>
        {(user) &&
          <>
          <Header as="h3">Shipping Address</Header>
          <List>
          <List.Item>{user.name}</List.Item>
          <List.Item>{user.street1}</List.Item>
          {(user.street2 )&& <List.Item>{user.street2}</List.Item> }
          <List.Item>{user.city}, {user.state}</List.Item>
          <List.Item>{user.postalCode}</List.Item>
          </List>
          </>
        }
        {(faves) &&
          <>
          <Header as="h3">Favorite recipes</Header>
          <List>
            {this.displayFaves(faves)}
          </List>
          </>
        }
        {(orders[0]) &&
          <>
          <Header as="h3">Orders</Header>
          <Accordion defaultActiveIndex={0}
            panels={this.buildOrderTables(orders)}
          />
          </>
        }
      </>
    )
  }
}

export default UserProfile;
