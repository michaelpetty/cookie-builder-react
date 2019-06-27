import React from 'react';
import axios from 'axios';
import { Header, List, Button, Image, Grid } from 'semantic-ui-react';
import RecipeList from '../lists/RecipeList';

class BuildCookie extends React.Component {
  state = {
    topIngred: [],
    recipeResults: [],
    chosenIngred: []
  }

  componentDidMount() {
    this.props.setHeader('Build-A-Cookie');
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/v1/ingredients/top`
    })
      .then(response => {
        this.setState({ topIngred: response.data });
      })
      .catch(err => console.log(err));
  }

  addIngred = (id) => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/v1/recipes?ingredient=${id}`
    })
      .then(response => {
        this.setState({ recipeResults: response.data });
      })
      .catch(err => console.log(err));

  }

  displayRecipes = recipes => {
    return recipes.map((recipe, i) => (
          <RecipeList isLoggedIn={this.props.isLoggedIn} recipe={recipe.Recipe} faves={this.props.faves} toggleFave={this.props.toggleFave} key={i}/>
    ))
  }

  displayTopIngs = ings => {
    return ings.map((ing, i) => (
      <Button size='medium' content={ing.name} draggable className='draggable' onClick={() => this.addIngred(ing.id)} key={i} />
    ))
  }

  render() {
    const { topIngred, recipeResults } = this.state;
    document.title = 'MP\'s Cookie Factory' ;

    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width='9'>
              <Image src='/i/KitchenAidRed.png' wrapped />
            </Grid.Column>
            <Grid.Column width='7'>

          {(recipeResults[0]) ? (
            <>
            <Header as="h3">Matching recipes</Header>
            <List selection verticalAlign="middle">
              {this.displayRecipes(recipeResults)}
            </List>
            </>
          ) : (
            <Header as="h3">Choose an ingredient</Header>
          )}
          </Grid.Column>
        </Grid.Row>
        </Grid>
        {this.displayTopIngs(topIngred)}
      </>
    )
  }
}

export default BuildCookie;
