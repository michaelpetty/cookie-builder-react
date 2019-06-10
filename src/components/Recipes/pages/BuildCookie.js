import React from 'react';
import axios from 'axios';
import { Header, List, Button } from 'semantic-ui-react';
import RecipePopUp from '../lists/RecipePopUp';

class BuildCookie extends React.Component {
  state = {
    topIngred: [],
    recipeResults: [],
    chosenIngred: []
  }

  componentDidMount() {
    this.props.setHeader('Build-A-Cookie');
    axios({
      method: 'get',
      url: 'http://localhost:4000/api/v1/ingredients/top'
    })
      .then(response => {
        this.setState({ topIngred: response.data });
      })
      .catch(err => console.log(err));
  }

  addIngred = (id) => {
    axios({
      method: 'get',
      url: `http://localhost:4000/api/v1/recipes?ingredient=${id}`
    })
      .then(response => {
        this.setState({ recipeResults: response.data });
      })
      .catch(err => console.log(err));

  }

  displayRecipes = recipes => {
    return recipes.map((recipe, i) => (
      <RecipePopUp recipe={recipe.Recipe} faves={this.props.faves} key={i}/>
    ))
  }

  displayTopIngs = ings => {
    return ings.map((ing, i) => (<Button size='medium' content={ing.name} onClick={() => this.addIngred(ing.id)} key={i}/>))
  }

  render() {
    const { topIngred, recipeResults } = this.state;
    return (
      <>
        {this.displayTopIngs(topIngred)}
        {(recipeResults[0]) &&
          <>
          <Header as="h3">Matching recipes</Header>
          <List>
            {this.displayRecipes(recipeResults)}
          </List>
          </>
        }
      </>
    )
  }
}

export default BuildCookie;
