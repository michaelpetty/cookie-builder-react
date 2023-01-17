import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Button, Form, List, Header } from 'semantic-ui-react';

const OrderForm = ({setHeader, user, openLogin}) => {
  const {recipeId} = useParams()

  const [quantity, setQuantity] = useState(1)
  const [recipe, setRecipe] = useState(null)
  const [cost, setCost] = useState(0)
  const [expectedDelivery, setExpectedDelivery] = useState(new Date())
  const [orders, setOrders] = useState(null)

  useEffect(() =>  {
    setHeader('Order Form');
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/v1/recipes/${recipeId}`
    })
      .then(response => {
        setRecipe(response.data)
        setCost(response.data.price)
      })
      .catch(err => console.log(err));
  }, [recipeId, setHeader])

  const handleSubmit = e => {
    e.preventDefault();
    if (localStorage.token) {
      const deliveryDate = new Date(expectedDelivery.getFullYear(), expectedDelivery.getMonth(), expectedDelivery.getDate() + 7)
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/auth/user/orders`,
        headers: { authorization: `Bearer ${localStorage.token}` },
        data: {
          expectedDelivery: deliveryDate,
          quantity: quantity,
          paid: cost,
          RecipeId: recipe.id,
          UserId: user.id
        }
      })
      .then(response => {
        setOrders(response.data)
        setExpectedDelivery(deliveryDate)
      })
      .catch(err => console.log(err));
    }
  }

  const handleQuantity = e => {
    setQuantity(e.target.value)
    setCost(e.target.value * recipe.price)
  }

  const disabled = (!user);
  document.title = 'Order Form - MP\'s Cookie Factory' ;

  return (
    <div>
      {(disabled) &&
        <div>Please <Button content='login' onClick={openLogin} compact /> to order</div>
      }
      {!(orders) ? (
        <>
          <Form onSubmit={handleSubmit}>
            <Form.Group inline>
              <Form.Input width={2} fluid id='quantity' name='quantity' type='number' min='1' max='10' value={quantity} onChange={handleQuantity} /> dozen {(recipe) && <>{recipe.name}</>} cookies for ${cost}
            </Form.Group>
            <Form.Button content='Place your order' disabled={disabled} />
          </Form>
          {(user) &&
            <>
              <Header as="h3">Shipping to:</Header>
              <List>
                <List.Item>{user.name}</List.Item>
                <List.Item>{user.street1}</List.Item>
                {(user.street2 )&& <List.Item>{user.street2}</List.Item> }
                <List.Item>{user.city}, {user.state}</List.Item>
                <List.Item>{user.postalCode}</List.Item>
                </List>
            </>
          }
      </>
    ) : (

      <div>
      Thanks for the order of  dozen {(recipe) && <>{recipe.name}</>} cookies! You can expect delivery by {expectedDelivery.toLocaleDateString()}.

      Order #{orders.id}
      </div>
    )}
    </div>
  )
}

export default OrderForm;
