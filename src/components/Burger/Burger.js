import React from 'react'
import BurgerIngredient from './/BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const burger = (props) => {

    let ingredients = Object.keys(props.ingredients).map(key => {
        return [...Array(props.ingredients[key])].map((_, i) => {
            return <BurgerIngredient key={key + i} type={key} />
        });
    });

    // Get if there are ingredients
    const ingredientsQty = ingredients.reduce((sum, value) => value.length + sum, 0);

    ingredients = ingredientsQty !== 0 ? ingredients : (
        <p>Please, add some ingredients!</p>
    );

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger
