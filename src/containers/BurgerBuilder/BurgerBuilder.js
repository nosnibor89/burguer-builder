import React, { Component } from 'react'
import Auxiliar from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Orders from "../../api/orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    modalIsVisible: false,
};

export default class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }


    state = initialState;


    calcBurger(type, operation) {
        this.setState((prevState, props) => {
            const newIngredients = {
                ...prevState.ingredients,
                [type]: operation === 'add' ? +prevState.ingredients[type] + 1 : +prevState.ingredients[type] - 1
            };
            const newPrice = operation === 'add' ? +prevState.totalPrice + INGREDIENT_PRICES[type] : +prevState.totalPrice - INGREDIENT_PRICES[type];

            return {
                ingredients: newIngredients,
                totalPrice: newPrice.toFixed(2),
                purchasable: this.isPurchasable(newIngredients, 2)
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

    /**
     * Check a burger as purchasable. Depends on the min ingredients given
     * @param ingredients
     * @returns {boolean}
     */
    isPurchasable(ingredients, minIngredients){
        let sum = 0;

        for(const ingName of Object.keys(ingredients)){
            if(ingredients[ingName] > 0){
                sum++;
            }
        }

        return sum >= minIngredients;
    }

    toggleOrderModal = () => {
        this.setState((prevState, props) => {
            return{
                modalIsVisible: !prevState.modalIsVisible
            }
        })
    }

    purchase = () => {
        Orders.saveOrder({ingredients: this.state.ingredients, price: this.state.totalPrice})
            .then((res) => {
                console.log(res);
                this.setState(initialState);
            })
            .catch((err) => {
                alert('Error with purchase, try again')
                console.log("error: ", err);
            });
    }

    render() {

        const disabledItems = {...this.state.ingredients};
        Object.keys(disabledItems).forEach((key) => disabledItems[key] = this.state.ingredients[key] <= 0);

        // const modal = this.state.modalIsVisible && (
        //     <Modal>
        //         <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
        //     </Modal>
        // );

        return (
            <Auxiliar>
                {/*{modal}*/}
                <Modal show={this.state.modalIsVisible} onHideModal={this.toggleOrderModal}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        onPurchaseCancel={this.toggleOrderModal}
                        onPurchaseContinue={this.purchase}></OrderSummary>
                </Modal>

                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onIngredientAdd={this.addIngredientHandler}
                    onIngredientRemove={this.removeIngredientHandler} disabledControls={disabledItems}
                    onToggleBurgerOrder={this.toggleOrderModal}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}/>
            </Auxiliar>
        )
    }
}
