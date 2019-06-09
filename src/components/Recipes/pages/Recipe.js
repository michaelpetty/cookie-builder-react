import React from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

class Recipe extends React.Component {
  state = {
    recipeId: this.props.match.params.recipeId,
    recipe: {},
    recipeSteps: [],
    recIngs: []
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `http://localhost:4000/api/v1/recipes/${this.state.recipeId}/full`
    })
      .then(response => {
        console.log(response);
        this.setState({recipe: response.data.recipe, recipeSteps: response.data.recipeSteps, recIngs: response.data.ingredients});
      })
      .catch(err => console.log(err));
  }

  displaySteps = steps => {
    return steps.map((step, i) => (<List.Item  key={i}>{step.body}</List.Item>))
  }

  displayIngs = ings => {
    return ings.map((ing, i) => (<List.Item  key={i}>{ing.amount} {ing.unit} {ing.Ingredient.name} {ing.preparation}</List.Item>))
  }

  render() {
    const { recipe, recipeSteps, recIngs } = this.state;
    return (
      <>
        <Header as="h2">{recipe.name} Recipe</Header>
        {(recIngs[0]) &&
          <>
          <Header as="h3">Ingredients</Header>
          <List ordered>
            {this.displayIngs(recIngs)}
          </List>
          </>
        }
        {(recipeSteps[0]) &&
          <>
          <Header as="h3">Steps</Header>
          <List ordered>
            {this.displaySteps(recipeSteps)}
          </List>
          </>
        }
        </>
      )
    }
}

export default Recipe;
