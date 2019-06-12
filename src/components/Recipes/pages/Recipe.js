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
    this.props.setHeader('Recipe');
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/v1/recipes/${this.state.recipeId}/full`
    })
      .then(response => {
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
        <Header as="h2">{recipe.name}</Header>
        {(recIngs[0]) &&
          <>
          {(recipe.intro) && <i>Intro: {recipe.intro}</i> }
          <Header as="h3">Ingredients</Header>
          <List>
            {this.displayIngs(recIngs)}
          </List>
          {(recipe.activeTime) && <>Active Time: {recipe.activeTime}</>} {(recipe.totalTime) && <>Total Time: {recipe.totalTime}</>}<br/>
          Yield: {recipe.yield}
          </>
        }
        {(recipeSteps[0]) &&
          <>
          <Header as="h3">Steps</Header>
          Preheat: {recipe.preheat}&deg;
          <List ordered>
            {this.displaySteps(recipeSteps)}
          </List>
          {recipe.note}<br/>
          Source: <a href={recipe.sourceURL}>{recipe.source}</a>
          </>
        }
        </>
      )
    }
}

export default Recipe;
