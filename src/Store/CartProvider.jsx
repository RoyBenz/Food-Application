import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartDefaultAction = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const existingItemsIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItems = state.items[existingItemsIndex];
    let updatedItems;

    if (existingItems) {
      const updatedItem = {
        ...existingItems,
        amount: existingItems.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemsIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    if (action.type === "REMOVE") {
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemsIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItems = state.items[existingItemsIndex];

    const updatedTotalAmount = state.totalAmount - existingItems.price;
    let updatedItems;

    if (existingItems.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItems,
        amount: existingItems.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemsIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return cartDefaultAction;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    cartDefaultAction
  );
  const addItemsToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemsFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemsToCartHandler,
    removeItem: removeItemsFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
