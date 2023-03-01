import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0
      cartList.forEach(x => {
        totalAmount += x.price * x.quantity
      })
      const totalProductsCount = cartList.length
      return (
        <div className="totalContainerCheckOut">
          <div className="totalContainerCheckOutSub">
            <h1 className="orderTotalHeading">
              Order Total:{' '}
              <span className="orderTotalHeadingAmount">
                Rs {totalAmount}/-
              </span>
            </h1>
            <p className="orderTotalPara">{totalProductsCount} Items in cart</p>
          </div>
          <button className="checkoutButton" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
