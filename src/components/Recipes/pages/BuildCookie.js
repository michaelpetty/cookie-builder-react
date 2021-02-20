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
    return ings.map((ing) => (
      <Button size='medium' draggable content={ing.name} className='draggable' onDragStart={(e) => this.onDragStart(e, ing)} data-ing-img-src={this.createIngImg(ing)} key={ing.id} />
    ))
  }

  images = {}

  createIngImg = ing => {
    const img = document.createElement('img');
    img.src = `/i/ing/${ing.name.match(/\b(\w)/g).join('')}.png`;
    this.images[ing.id] = img;
    return img.src;
  }

  onDragOver = e => {
    e.preventDefault();
  }

  onDragStart = (e, ing) => {
    e.dataTransfer.setData('text/plain', ing.id);
    e.dataTransfer.setDragImage(this.images[ing.id], 30, 30);
  }

  onDrop = e => {
    e.preventDefault();
    this.addIngred(e.dataTransfer.getData('text'));
  }

  onClear = () => {
    this.setState({ recipeResults: [] });
  }

  render() {
    const { topIngred, recipeResults } = this.state;
    document.title = 'MP\'s Cookie Factory' ;

    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width='9' className='droppable' onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)}>
              <Image src='/i/KitchenAidRed.png' wrapped />
            </Grid.Column>
            <Grid.Column width='7'>

          {(recipeResults[0]) ? (
            <>
            <Header as="h3">Matching recipes</Header>
            <List selection verticalAlign="middle">
              {this.displayRecipes(recipeResults)}
            </List>
            <Button size='tiny' compact content={'CLEAR RESULTS'} onClick={this.onClear}/>
            </>
          ) : (
            <Header as="h3">Drag an ingredient to the bowl<br/>
            to see matching recipes</Header>
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
