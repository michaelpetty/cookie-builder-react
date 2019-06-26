import React from 'react';
import axios from 'axios';
import { Header, Menu, Container, Image, Dropdown } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import Routes from './config/routes';
import Login from './components/User/pages/Login';

import './App.css';

class App extends React.Component {
  state = {
    email: '',
    password: '',
    isLoggedIn: '',
    isModalOpen: false,
    header: 'Build-A-Cookie',
    user: null,
    faves: null
  }
  componentDidMount() {
    if (localStorage.token) {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/auth/user/full`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          this.setState({
            isLoggedIn: true,
            user: response.data.user,
            faves: response.data.faves
          })
        })
        .catch(err => {
          console.log(err.response.data);
          localStorage.removeItem('token');
          this.setState({
            isLoggedIn: false,
            user: null,
            faves: null
          })
        })
    } else {
      this.setState({
        isLoggedIn: false,
        user: null,
        faves: null
      })
    }
  }

  toggleFave = (recipeId, add) => {
    if (!add) {
      if (localStorage.token) {
        axios({
          method: 'delete',
          url: `${process.env.REACT_APP_API}/auth/user/faves/${recipeId}`,
          headers: { authorization: `Bearer ${localStorage.token}` }
        })
        .then(response => {
          //something cool happens here
          let tmpFaves = this.state.faves;
          tmpFaves.splice(this.state.faves.findIndex((fave) => fave.RecipeId === recipeId), 1);
          this.setState({
            faves: tmpFaves
          })
        })
        .catch(err => console.log(err));
      }
    } else {
      if (localStorage.token) {
        axios({
          method: 'post',
          url: `${process.env.REACT_APP_API}/auth/user/faves/${recipeId}`,
          headers: { authorization: `Bearer ${localStorage.token}` }
        })
        .then(response => {
          this.setState({
            faves: response.data
          })
        })
        .catch(err => console.log(err));
      } else {
        this.openLogin();
      }
    }
  }


  handleLogOut = (e) => {
    e.preventDefault();
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false,
      user: null,
      faves: null
    });
    localStorage.clear();
    if (/^\/profile$/.test(this.props.location.pathname)) {
      this.props.history.push(`/`);
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = e => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/auth/user/signup`, {
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

  openLogin = () => {
    this.setState({isModalOpen: true});
  }

  closeLogin = () => {
    return this.setState({isModalOpen: false});
  }

  handleLogIn = e => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/auth/user/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.signedJwt;
        this.setState({
          isLoggedIn: true,
          user: response.data.user,
          faves: response.data.faves,
          email: '',
          password: ''
        })
        this.closeLogin();
      })
      .catch(err => console.log(err));
  }

  setHeader = (title) => this.setState({header: title});


  render() {
    const { isLoggedIn, isModalOpen, header, user, faves } = this.state;
    return (
      <>
      <Menu fixed='top' as='header'>
        <Container>
          <Menu.Item as={Link} to='/' header>
            <Image size='mini' src='/i/chocChip60.png' style={{ marginRight: '1.5em' }} />
            MP's Cookie Factory
          </Menu.Item>
          <Menu.Item position='right'>
            <Header as='h2'>{header}</Header>
          </Menu.Item>
          <Menu.Item>
          <Dropdown simple direction='left' text='Navigation' as='nav'>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to='/'>Cookie Builder</Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/pre-built-cookies'>Pre-Built Cookies</Dropdown.Item>
              <Dropdown.Divider />
              {(isLoggedIn)? (
                <>
                  <Dropdown.Item as={NavLink} to='/profile'>Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.handleLogOut}>Sign Out</Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item onClick={this.openLogin}>Login</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          </Menu.Item>
        </Container>
      </Menu>
      <Login handleInput={this.handleInput} handleLogIn={this.handleLogIn} isModalOpen={isModalOpen} closeLogin={this.closeLogin} />
      <Container text style={{ marginTop: '7em' }}>
        <Routes isLoggedIn={isLoggedIn} openLogin={this.openLogin} user={user} faves={faves} toggleFave={this.toggleFave} setHeader={this.setHeader} />
      </Container>
      </>
    )
  }
}

export default withRouter(App);
