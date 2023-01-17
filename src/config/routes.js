import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BuildCookie from '../components/Recipes/pages/BuildCookie';
import Recipe from '../components/Recipes/pages/Recipe';
import PreBuilt from '../components/Recipes/pages/PreBuilt';
import OrderForm from '../components/User/pages/OrderForm';
import UserProfile from '../components/User/pages/UserProfile';

const Router = ({ isLoggedIn, openLogin, user, faves, toggleFave, setHeader }) => (
  <Routes>
    <Route exact path='/' element={ <BuildCookie isLoggedIn={isLoggedIn} faves={faves} toggleFave={toggleFave} setHeader={setHeader} />} />
    <Route path='/pre-built-cookies' element={ <PreBuilt isLoggedIn={isLoggedIn} user={user} faves={faves} toggleFave={toggleFave} setHeader={setHeader} />} />
    <Route path='/recipe/:recipeId' element={ <Recipe isLoggedIn={isLoggedIn} faves={faves} toggleFave={toggleFave} setHeader={setHeader} />} />
    <Route path='/order-form/:recipeId' element={ <OrderForm isLoggedIn={isLoggedIn} openLogin={openLogin} user={user} toggleFave={toggleFave} setHeader={setHeader} />} />
    <Route path='/profile' element={ <UserProfile isLoggedIn={isLoggedIn} user={user} faves={faves} toggleFave={toggleFave} setHeader={setHeader} />} />
  </Routes>
);

export default Router;
