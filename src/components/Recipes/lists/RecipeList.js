import React from 'react';
import { List, Image } from 'semantic-ui-react';
import RecipePopUp from './RecipePopUp';

const RecipeList = ({isLoggedIn, recipe, faves, toggleFave, isCard}) => {
  return (
    <List.Item>
      <Image avatar src={recipe.picture} />
      <List.Content>
        <RecipePopUp isLoggedIn={isLoggedIn} recipe={recipe} faves={faves} toggleFave={toggleFave} />
      </List.Content>
    </List.Item>
  )
}

export default RecipeList;
