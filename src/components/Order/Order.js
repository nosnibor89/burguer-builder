import React from "react";
import classes from './Order.css';

const Order = ({order}) => {

    let ingredients = [];
    // Salad (1)
    const fetchedIngredients = order.ingredients;
    for (const i in fetchedIngredients) {
        ingredients.push(`${i} (${fetchedIngredients[i]})`);
    }

    ingredients = ingredients.join(' | ');

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {order.price}</strong></p>
        </div>
    )
}

export default Order;