import React from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Routes from './config/routes';
import Login from './components/User/pages/Login';

import './App.css';

class App extends React.Component {
  state = {
    email: '',
    password: '',
    isLoggedIn: '',
    user: {},
    faves: []
  }
  componentDidMount() {
    if (localStorage.token) {
      axios({
        method: 'get',
        url: `http://localhost:4000/auth/user/full`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          this.setState({
            isLoggedIn: true,
            user: response.data.user,
            faves: response.data.faves
          });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        isLoggedIn: false
      });
    }
  }

  handleLogOut = (e) => {
    e.preventDefault();
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false
    });
    localStorage.clear();
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = e => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/auth/user/signup', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        localStorage.token = response.data.signedJwt;
        this.setState({
          isLoggedIn: true
        })
      })
      .catch(err => console.log(err));
  }

  handleLogIn = e => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/auth/user/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.signedJwt;
        this.setState({
          isLoggedIn: true,
          user: response.data.user,
          faves: response.data.faves
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { isLoggedIn, user, faves } = this.state;
    return (
      <>
      <Login isLoggedIn={isLoggedIn} handleInput={this.handleInput} handleLogIn={this.handleLogIn} />
      <form>
        <input value='Log Out' type='submit' onClick={this.handleLogOut} />
      </form>
      <Dropdown text="Navigation">
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to='/'>Cookie Builder</Dropdown.Item>
          <Dropdown.Item as={NavLink} to='/pre-built-cookies'>Pre-Built Cookies</Dropdown.Item>
          {(isLoggedIn) && <Dropdown.Item as={NavLink} to='/profile'>Profile</Dropdown.Item> }
        </Dropdown.Menu>
      </Dropdown>
      <Routes isLoggedIn={isLoggedIn} user={user} faves={faves} />
      </>
    )
  }
}

export default App;
