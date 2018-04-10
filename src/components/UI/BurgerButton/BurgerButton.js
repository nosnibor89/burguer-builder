import React from "react";
import classes from './BurgerButton.css';

const burgerButton = (props) => (
    <div className={classes.BurgerButton} onClick={props.toggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default burgerButton;