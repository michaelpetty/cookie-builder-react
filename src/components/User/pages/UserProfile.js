import React from 'react';
import axios from 'axios';
import { Header, List, Button } from 'semantic-ui-react';

class UserProfile extends React.Component {
  state = {
    orders: [],
  }

  componentDidMount() {
    // axios({
    //   method: 'get',
    //   url: 'http://localhost:4000/api/v1/ingredients/top'
    // })
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ topIngred: response.data });
    //   })
    //   .catch(err => console.log(err));
  }


  // displayDeets = user => {
  //   return recipes.map((recipe, i) => (<List.Item  key={i}>{recipe.Recipe.name}</List.Item>))
  // }

  displayFaves = faves => {
    return faves.map((fave, i) => (<List.Item  key={i}>{fave.Recipe.name}</List.Item>))
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

        {/*this.displayTopIngs(topIngred)*/}
      </>
    )
  }
}

export default UserProfile;
