import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BuildCookie from '../components/Recipes/pages/BuildCookie';
import Recipe from '../components/Recipes/pages/Recipe';
import PreBuilt from '../components/Recipes/pages/PreBuilt';
// import Login from '../components/auth/Login';
// import ProfileContainer from '../containers/ProfileContainer';
// import PostContainer from '../containers/PostContainer';

const Routes = ({ isLoggedIn }) => (
  //{ currentUser, setCurrentUser }
  <Switch>
    <Route exact path='/' component={BuildCookie} />
    <Route path='/pre-built-cookies' component={PreBuilt} />
    <Route path='/recipe/:recipeId' component={Recipe} />
  </Switch>
);

export default Routes;
