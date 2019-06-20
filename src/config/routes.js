import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BuildCookie from '../components/Recipes/pages/BuildCookie';
import Recipe from '../components/Recipes/pages/Recipe';
import PreBuilt from '../components/Recipes/pages/PreBuilt';
import OrderForm from '../components/User/pages/OrderForm';
import UserProfile from '../components/User/pages/UserProfile';

const Routes = ({ isLoggedIn, user, faves, toggleFave, setHeader }) => (
  <Switch>
    <Route exact path='/' render={(props) => <BuildCookie {...props}  isLoggedIn={isLoggedIn} faves={faves} toggleFave={toggleFave} setHeader={setHeader} />} />
    <Route path='/pre-built-cookies' render={(props) => <PreBuilt {...props} isLoggedIn={isLoggedIn} user={user} faves={faves} toggleFave={toggleFave} setHeader={setHeader} />} />
    <Route path='/recipe/:recipeId' render={(props) => <Recipe {...props} isLoggedIn={isLoggedIn} faves={faves} toggleFave={toggleFave} setHeader={setHeader} />} />
    <Route path='/order-form/:recipeId' render={(props) => <OrderForm {...props} isLoggedIn={isLoggedIn} user={user} toggleFave={toggleFave} setHeader={setHeader} />} />
    <Route path='/profile' render={(props) => <UserProfile {...props} isLoggedIn={isLoggedIn} user={user} faves={faves} toggleFave={toggleFave} setHeader={setHeader} />} />
  </Switch>
);

export default Routes;
