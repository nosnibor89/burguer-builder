
import React from 'react';
import Auxiliar from "../../../hoc/Auxiliar";



const orderSummary = (props) =>{

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

            <button onClick={props.onCancel}>Cancel</button>
            <button >Continue</button>
        </Auxiliar>
    )
};

export default orderSummary;