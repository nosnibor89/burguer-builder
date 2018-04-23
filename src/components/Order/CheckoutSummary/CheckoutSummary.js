import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>We hope it taste good</h1>
        <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button onClick={props.onPurchaseCancel}  type="Danger">Cancel</Button>
        <Button type="Success" onClick={props.onPurchaseContinue}>Continue</Button>
    </div>
);

export default CheckoutSummary;