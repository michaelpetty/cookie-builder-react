import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

const Recipe = ({setHeader}) => {
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState({})
  const [recipeSteps, setRecipeSteps] = useState([])
  const [recIngs, setRecIngs] = useState([])

  useEffect(() => {
    setHeader('Recipe');
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/v1/recipes/${recipeId}/full`
    })
      .then(response => {
        setRecipe(response.data.recipe)
        setRecipeSteps(response.data.recipeSteps)
        setRecIngs(response.data.ingredients)
      })
      .catch(err => console.log(err));
  }, [recipeId, setHeader])

  const displaySteps = steps => {
    return steps.map((step, i) => (<List.Item  key={i}>{step.body}</List.Item>))
  }

  const displayIngs = ings => {
    return ings.map((ing, i) => (<List.Item  key={i}>{ing.amount} {ing.unit} {ing.Ingredient.name} {ing.preparation}</List.Item>))
  }

  document.title = `${recipe.name} Recipe - MP's Cookie Factory`;

  return (
    <>
      <Header as="h2">{recipe.name}</Header>
      {(recIngs[0]) &&
        <>
        {(recipe.intro) && <i>Intro: {recipe.intro}</i> }
        <Header as="h3">Ingredients</Header>
        <List>
          {displayIngs(recIngs)}
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
          {displaySteps(recipeSteps)}
        </List>
        {recipe.note}<br/>
        Source: <a href={recipe.sourceURL}>{recipe.source}</a>
        </>
      }
      </>
    )
}

export default Recipe;
