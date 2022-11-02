import React from "react";
import classes from "./Header.module.css";
import IMG from "../../Assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Sal's Menu</h1>
        <HeaderCartButton onClick={props.onShowModal} />
      </header>
      <div className={classes["main-image"]}>
        <img src={IMG} alt={"table full of delicious food"} />
      </div>
    </React.Fragment>
  );
};

export default Header;
