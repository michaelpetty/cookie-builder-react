import React from 'react';
import axios from 'axios';

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
    steps.map((step, i) => (
      <div key={i}>
        {step.body}
      </div>
  ))


  render() {
    const {recipeSteps} = this.state;
    return (
      <>
      <h1> It's about to get all sorts</h1>
      <h2>of real up in here</h2>
      {this.state.recipe.name}<br/>
      {this.displaySteps(recipeSteps)}

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
