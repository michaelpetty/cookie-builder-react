import React from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

class PreBuilt extends React.Component {
  state = {
    recipes: [],
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:4000/api/v1/recipes'
    })
      .then(response => {
        console.log(response);
        this.setState({recipes: response.data});
      })
      .catch(err => console.log(err));
  }

  displayRecipes = recipes => {
    return recipes.map((recipe, i) => (<List.Item  key={i}>{recipe.name}</List.Item>))
  }

  render() {
    const { recipes } = this.state;
    return (
      <>
        <Header as="h2">Pre-built Cookies</Header>
        {(recipes[0]) &&
          <List>
            {this.displayRecipes(recipes)}
          </List>
        }
      </>
    )
  }
}

export default PreBuilt;
