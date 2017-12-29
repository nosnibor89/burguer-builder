import React from 'react'
import BurguerIngredient from '../Burguer/BurguerIngredient/BurguerIngredient';
import classes from './Burger.css'

const burger = (props) => {

    let ingredients = Object.keys(props.ingredients).map(key => {
        return [...Array(props.ingredients[key])].map((_, i) => {
            return <BurguerIngredient key={key + i} type={key} />
        });
    });

    // Get if there are ingredients
    const ingredientsQty = ingredients.reduce((sum, value) => value.length + sum, 0);

    ingredients = ingredientsQty !== 0 ? ingredients : (
        <p>Please, add some ingredients!</p>
    );

    return (
        <div className={classes.Burger}>
            <BurguerIngredient type="bread-top" />
            {ingredients}
            <BurguerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger
