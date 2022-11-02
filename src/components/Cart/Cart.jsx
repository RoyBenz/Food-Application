import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((items) => (
        <CartItem
          key={items.id}
          name={items.name}
          amount={items.amount}
          price={items.price}
          onAdd={addToCartHandler.bind(null, items)}
          onRemove={removeFromCartHandler.bind(null, items.id)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onHideModal={props.onHideModal}>
      {CartItems}
      <div className={classes.total}>
        Total Amount
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideModal} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
