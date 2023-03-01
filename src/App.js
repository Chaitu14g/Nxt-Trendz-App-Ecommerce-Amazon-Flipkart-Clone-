import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const similarData = cartList.find(eachItem => eachItem.id === product.id)
    let updatedProduct
    if (similarData !== undefined) {
      const oldQuantity = similarData.quantity
      const newQuantity = product.quantity
      updatedProduct = {...product, quantity: oldQuantity + newQuantity}
      const newCartList = cartList.filter(
        eachItem => eachItem.id !== product.id,
      )
      this.setState({
        cartList: [...newCartList, updatedProduct],
      })
    } else {
      updatedProduct = product
      this.setState(prevState => ({
        cartList: [...prevState.cartList, updatedProduct],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const similarData = cartList.find(eachItem => eachItem.id === id)
    const newCartList = cartList.filter(eachItem => eachItem.id !== id)
    const oldQuantity = similarData.quantity
    const updatedData = {...similarData, quantity: oldQuantity + 1}
    this.setState({
      cartList: [...newCartList, updatedData],
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const similarData = cartList.find(eachItem => eachItem.id === id)
    const newCartList = cartList.filter(eachItem => eachItem.id !== id)
    const oldQuantity = similarData.quantity
    if (oldQuantity === 1) {
      this.setState({
        cartList: [...newCartList],
      })
    } else {
      const updatedData = {...similarData, quantity: oldQuantity - 1}
      this.setState({
        cartList: [...newCartList, updatedData],
      })
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
