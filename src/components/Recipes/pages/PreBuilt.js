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
      url: `${process.env.REACT_APP_API}/api/v1/recipes`
    })
      .then(response => {
        this.setState({recipes: response.data});
      })
      .catch(err => console.log(err));
  }

  displayRecipes = recipes => {
    return recipes.map((recipe, i) => (
      <RecipePopUp isLoggedIn={this.props.isLoggedIn} recipe={recipe} faves={this.props.faves} toggleFave={this.props.toggleFave} isCard key={i}/>
    ))
  }

  render() {
    const { recipes } = this.state;
    document.title = 'Pre-Built Cookies - MP\'s Cookie Factory' ;
    return (
      <>
        {(recipes[0]) &&
          <Card.Group stackable doubling itemsPerRow="3">
            {this.displayRecipes(recipes)}
          </Card.Group>
        }
      </>
    )
  }
}

export default PreBuilt;
