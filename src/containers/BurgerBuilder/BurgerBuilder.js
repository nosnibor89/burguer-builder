import React, { Component } from 'react'
import Auxiliar from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};


export default class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4
    };


    calcBurger(type, operation) {
        this.setState((prevState, props) => {
            const newIngredients = {
                ...prevState.ingredients,
                [type]: operation === 'add' ? +prevState.ingredients[type] + 1 : +prevState.ingredients[type] - 1
            };
            const newPrice = operation === 'add' ? +prevState.totalPrice + INGREDIENT_PRICES[type] : +prevState.totalPrice - INGREDIENT_PRICES[type];

            return {
                ingredients: newIngredients,
                totalPrice: newPrice
            };
        });
    }


    addIngredientHandler = (type) => {
       this.calcBurger(type, 'add');
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0){
            return;
        }
        this.calcBurger(type, 'remove');
    }

    render() {
        const disabledItems = {...this.state.ingredients};
        Object.keys(disabledItems).forEach((key) => disabledItems[key] = this.state.ingredients[key] <= 0);

        return (
            <Auxiliar>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onIngredientAdd={this.addIngredientHandler}
                    onIngredientRemove={this.removeIngredientHandler} disabledControls={disabledItems}/>
            </Auxiliar>
        )
    }
}
