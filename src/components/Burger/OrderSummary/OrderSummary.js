
import React from 'react';
import Auxiliar from "../../../hoc/Auxiliar";
import Button from "../../UI/Button/Button";


const OrderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map((key) => <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span> : {props.ingredients[key]}</li>)

    return(
        <Auxiliar>
            <h3>Your Order</h3>
            <p>Here is your burger's details</p>

            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout ?</p>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to checkout ?</p>

            <Button onClick={props.onPurchaseCancel}  type="Danger">Cancel</Button>
            <Button type="Success" onClick={props.onPurchaseContinue}>Continue</Button>
        </Auxiliar>
    )
};

export default OrderSummary;