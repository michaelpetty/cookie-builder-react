import React from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

import './App.css';

class App extends React.Component {
  state = {
    recipe: {},
    recipeSteps: []
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:4000/api/v1/recipes/1/full'
    })
      .then(response => {
        console.log(response);
        this.setState({recipe: response.data.recipe, recipeSteps: response.data.recipeSteps});
      })
      .catch(err => console.log(err));
  }

  displaySteps = steps =>
        steps.map((step, i) => (<List.Item  key={i}>{step.body}</List.Item>))


  render() {
    const {recipeSteps} = this.state;
    return (
      <>
      <Header as="h2">cookie builder</Header>
      <Header as="h3">{this.state.recipe.name}</Header>
      {(recipeSteps[0]) &&
        <List ordered>
          {this.displaySteps(recipeSteps)}
          </List>
      }

      </>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       BOO YAH
//     </div>
//   );
// }

export default App;
