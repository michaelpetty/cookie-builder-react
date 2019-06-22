import React from 'react';
import { Popup, Menu, Icon, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RecipePopUp = ({isLoggedIn, recipe, faves, toggleFave, isCard}) => {

  const buildFaveLink = () => {
    if (isLoggedIn && faves.find((fave) => fave.RecipeId === recipe.id)) {
      return (<div onClick={() => toggleFave(recipe.id)}>Favorite (remove <Icon name='minus' />)</div>);
    } else {
      return (<div onClick={() => toggleFave(recipe.id, 'add')}>Add to favorites (<Icon name='plus' />)</div>);
    }
  }

  const buildTrigger = () => {
    if (isCard) {
      return (<Card image={recipe.picture} header={recipe.name} raised />)
    } else {
      return (<Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>)
    }
  }

  return (
    <Popup trigger={buildTrigger()} hoverable position="right center">
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
)}

export default RecipePopUp;
