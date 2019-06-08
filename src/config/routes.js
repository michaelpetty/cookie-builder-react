import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BuildCookie from '../components/Recipes/pages/BuildCookie';
import Recipe from '../components/Recipes/pages/Recipe';
import PreBuilt from '../components/Recipes/pages/PreBuilt';
import UserProfile from '../components/User/pages/UserProfile';
// import Login from '../components/auth/Login';
// import ProfileContainer from '../containers/ProfileContainer';
// import PostContainer from '../containers/PostContainer';

const Routes = ({ isLoggedIn, user, faves }) => (
  //{ currentUser, setCurrentUser }
  <Switch>
    <Route exact path='/' component={BuildCookie} />
    <Route path='/pre-built-cookies' component={PreBuilt} />
    <Route path='/recipe/:recipeId' component={Recipe} />
    <Route path='/profile' render={(props) => <UserProfile {...props} isLoggedIn={isLoggedIn} user={user} faves={faves} />} />
  </Switch>
);

export default Routes;
