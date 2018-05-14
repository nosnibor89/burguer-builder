import React, { Component } from 'react'
import { connect } from 'react-redux';

import Auxiliar from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
// import OrdersApi from "../../api/orders";
import Loader from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import * as actions from '../../store/actions';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.6
// };

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0,
    // },
    // totalPrice: 4,
    // purchasable: false,
    modalIsVisible: false,
    loading: false,
    hasError: false
};

class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }


    state = initialState;
    ingredientsPrices = null;

    // componentDidMount() {
    // this.isLoading();

    // OrdersApi.getIngredients()
    //     .then((res) =>{
    //         this.ingredientsPrices = res.data
    //         this.setState({ loading: false });
    //     })
    //     .catch((err) => {
    //         this.setState({loading: false, modalIsVisible: false, hasError: true});
    //         console.log("error: ", err);
    //         this.props.onError(err.message);
    //     });
    // console.log(this.props)
    // }


    // calcBurger(type, operation) {
    //     this.setState((prevState, props) => {
    //         const newIngredients = {
    //             ...prevState.ingredients,
    //             [type]: operation === 'add' ? +prevState.ingredients[type] + 1 : +prevState.ingredients[type] - 1
    //         };
    //         const newPrice = operation === 'add' ? +prevState.totalPrice + this.ingredientsPrices[type] : +prevState.totalPrice - this.ingredientsPrices[type];

    //         return {
    //             ingredients: newIngredients,
    //             totalPrice: newPrice.toFixed(2),
    //             purchasable: this.isPurchasable(newIngredients, 2)
    //         };
    //     });
    // }


    // addIngredientHandler = (type) => {
    //     this.calcBurger(type, 'add');
    // }

    // removeIngredientHandler = (type) => {
    //     if (this.state.ingredients[type] <= 0) {
    //         return;
    //     }
    //     this.calcBurger(type, 'remove');
    // }

    /**
     * Check a burger as purchasable. Depends on the min ingredients given
     * @param ingredients
     * @returns {boolean}
     */
    isPurchasable(ingredients, minIngredients) {
        let sum = 0;

        for (const ingName of Object.keys(ingredients)) {
            if (ingredients[ingName] > 0) {
                sum++;
            }
        }

        return sum >= minIngredients;
    }

    toggleOrderModal = () => {
        this.setState((prevState, props) => {
            return {
                modalIsVisible: !prevState.modalIsVisible
            }
        })
    }

    isLoading() {
        this.setState({ loading: true });
    }

    purchase = () => {
        // const queryParams = [];

        // for (const i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }

        // queryParams.push('price=' + this.props.totalPrice);

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: queryParams.join('&')
        // });

        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render() {

        const disabledItems = { ...this.props.ingredients };
        Object.keys(disabledItems).forEach((key) => disabledItems[key] = this.props.ingredients[key] <= 0);

        let orderSummary = (
            <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ingredients}
                onPurchaseCancel={this.toggleOrderModal}
                onPurchaseContinue={this.purchase}></OrderSummary>
        );

        let burger = (
            <Auxiliar>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    onIngredientAdd={this.props.addIngredient}
                    onIngredientRemove={this.props.removeIngredient} disabledControls={disabledItems}
                    onToggleBurgerOrder={this.toggleOrderModal}
                    price={this.props.totalPrice}
                    purchasable={this.isPurchasable(this.props.ingredients, 2)} />
            </Auxiliar>
        )

        if (this.state.loading) {
            orderSummary = <Loader />

        }

        if (this.state.loading && !this.ingredientsPrices) {
            burger = <Loader />
        }

        if (this.state.hasError) {
            burger = <p>Could not load ingredients</p>
        }

        return (
            <Auxiliar>
                <Modal show={this.state.modalIsVisible} onHideModal={this.toggleOrderModal}>
                    {orderSummary}
                </Modal>

                {burger}

            </Auxiliar>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
});

const mapDispatchToProps = dispatch => ({
    addIngredient: ingName => dispatch({ type: actions.ADD_INGREDIENT, ingredientName: ingName }),
    removeIngredient: ingName => dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: ingName }),
});


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder));
