import React from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

class BuildCookie extends React.Component {
  state = {
    topIngred: {},
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:4000/api/v1/ingredients/top'
    })
      .then(response => {
        console.log(response);
        this.setState({ topIngred: response.data });
      })
      .catch(err => console.log(err));
  }

  displayTopIngs = ings => {
    return ings.map((ing, i) => (<List.Item  key={i}> {ing.name}</List.Item>))
  }

  render() {
    const { topIngred } = this.state;
    return (
      <>
        <Header as="h2">cookie builder</Header>
        {(topIngred[0]) &&
          <List>
            {this.displayTopIngs(topIngred)}
          </List>
        }
        </>
      )
    }
}

export default BuildCookie;
