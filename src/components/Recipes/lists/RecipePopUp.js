import React from 'react';
import { List, Popup, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RecipePopUp = ({recipe, faves}) => {
  const buildFaveLink = () => {
    if (faves.find((fave) => fave.RecipeId === recipe.id)) {
      return (<>Favorite (remove<Icon name='minus' />)</>);
    } else {
      return (<>Fave/Save<Icon name='plus' /></>);
    }
  }

  return (
//  <>{console.log(recipe, faves)}</>
  <List.Item>
    <Popup trigger={<Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>} hoverable position="right center">
      <Menu vertical>
        <Menu.Item>
          <Link to={`/recipe/${recipe.id}`}>Recipe</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/order-form/${recipe.id}`}>Order</Link><br/>
          @ ${recipe.price}/dozen
        </Menu.Item>
        <Menu.Item>
          {buildFaveLink()}
        </Menu.Item>
      </Menu>
    </Popup>
  </List.Item>
)}

export default RecipePopUp;
