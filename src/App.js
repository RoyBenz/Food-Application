import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };
  return (
    <CartProvider>
      <Header onShowModal={showModalHandler} />
      <Meals />
      {showModal && <Cart onHideModal={hideModalHandler} />}
    </CartProvider>
  );
}

export default App;
