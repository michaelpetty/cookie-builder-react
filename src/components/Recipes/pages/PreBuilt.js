import React from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';
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
      <RecipePopUp recipe={recipe} faves={this.props.faves} isCard key={i}/>
    ))
  }

  render() {
    const { recipes } = this.state;
    return (
      <>
        {(recipes[0] && this.props.faves) &&
          <Card.Group stackable doubling itemsPerRow="3">
            {this.displayRecipes(recipes)}
          </Card.Group>
        }
      </>
    )
  }
}

export default PreBuilt;
