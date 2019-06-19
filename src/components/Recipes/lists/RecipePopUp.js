import React from 'react';
import axios from 'axios';
import { Popup, Menu, Icon, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RecipePopUp = ({recipe, faves, isCard}) => {

  const addFave = () => {
    if (localStorage.token) {
      axios({
        method: 'post',
        url: `http://localhost:4000/auth/user/faves/${recipe.id}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
      .then(response => {
        //something cool happens here
      })
      .catch(err => console.log(err));
    }
  }

  const removeFave = () => {
    if (localStorage.token) {
      axios({
        method: 'delete',
        url: `http://localhost:4000/auth/user/faves/${recipe.id}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
      .then(response => {
        //something cool happens here
      })
      .catch(err => console.log(err));
    }
  }

  const buildFaveLink = () => {
    if (faves.find((fave) => fave.RecipeId === recipe.id)) {
      return (<div onClick={removeFave}>Favorite (remove <Icon name='minus' />)</div>);
    } else {
      return (<div onClick={addFave}>Fave/Save (<Icon name='plus' />)</div>);
    }
  }

  const buildTrigger = () => {
    if (isCard) {
      return (<Card image={recipe.picture} header={recipe.name} centered raised />)
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
