import React from 'react';
import axios from 'axios';
import { Header, List, Button } from 'semantic-ui-react';

class BuildCookie extends React.Component {
  state = {
    topIngred: [],
    recipeResults: [],
    chosenIngred: []
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:4000/api/v1/ingredients/top'
    })
      .then(response => {
        console.log(response);
        this.setState({ topIngred: response.data });
      })
      .catch(err => console.log(err));
  }

  addIngred = (id) => {
    console.log(`clicked a button: ${id}`);
    axios({
      method: 'get',
      url: `http://localhost:4000/api/v1/recipes?ingredient=${id}`
    })
      .then(response => {
        console.log(response);
        this.setState({ recipeResults: response.data });
      })
      .catch(err => console.log(err));

  }

  displayRecipes = recipes => {
    return recipes.map((recipe, i) => (<List.Item  key={i}>{recipe.Recipe.name}</List.Item>))
  }

  displayTopIngs = ings => {
    return ings.map((ing, i) => (<Button size='medium' content={ing.name} onClick={() => this.addIngred(ing.id)} key={i}/>))
  }

  render() {
    const { topIngred, recipeResults } = this.state;
    return (
      <>
        <Header as="h2">cookie builder</Header>
        {(recipeResults[0]) &&
          <>
          <Header as="h3">Matching recipes</Header>
          <List>
            {this.displayRecipes(recipeResults)}
          </List>
          </>
        }

        {this.displayTopIngs(topIngred)}
      </>
    )
  }
}

export default BuildCookie;
