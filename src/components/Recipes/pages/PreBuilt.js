import React from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';
import RecipePopUp from '../lists/RecipePopUp';

class PreBuilt extends React.Component {
  state = {
    recipes: [],
  }

  componentDidMount() {
    this.props.setHeader('Pre-Built Cookies');
    axios({
      method: 'get',
      url: 'http://localhost:4000/api/v1/recipes'
    })
      .then(response => {
        this.setState({recipes: response.data});
      })
      .catch(err => console.log(err));
  }

  displayRecipes = recipes => {
    return recipes.map((recipe, i) => (
      <RecipePopUp recipe={recipe} faves={this.props.faves} key={i}/>
    ))
  }

  render() {
    const { recipes } = this.state;
    return (
      <>
        {(recipes[0] && this.props.faves) &&
          <List>
            {this.displayRecipes(recipes)}
          </List>
        }
      </>
    )
  }
}

export default PreBuilt;
