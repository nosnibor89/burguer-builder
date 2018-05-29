import React, { Component } from 'react'
import { connect } from 'react-redux';

import Auxiliar from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Loader from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import * as burgerActions from '../../store/actions';

const initialState = {
    modalIsVisible: false,
};

class BurgerBuilder extends Component {
    state = initialState;

    componentDidMount() {
        this.props.initIngredientsPrices();
    }

    /**
     * Check a burger as purchasable. Depends on the min ingredients given
     * @param ingredients
     * @returns {boolean}
     */
    isPurchasable(ingredients, minIngredients) {
        let sum = 0;

        if(!ingredients){
            return false;
        }

        for (const ingName of Object.keys(ingredients)) {
            if (ingredients[ingName] > 0) {
                sum++;
            }
        }

        return sum >= minIngredients;
    }

    toggleOrderModal = () => {
        if(!this.props.isAuthenticated){
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
            return;
        }

        this.setState((prevState, props) => {
            return {
                modalIsVisible: !prevState.modalIsVisible
            }
        });
    }

    isLoading() {
        this.setState({ loading: true });
    }

    purchase = () => {
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
                    purchasable={this.isPurchasable(this.props.ingredients, 2)}
                    isAuth={this.props.isAuthenticated}/>
            </Auxiliar>
        )

        if (this.props.loading) {
            orderSummary = <Loader />
        }

        if (this.props.loading && !this.ingredientsPrices) {
            burger = <Loader />
        }

        if (this.props.hasError) {
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
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    hasError: state.burger.hasError,
    loading: state.burger.loading,
    isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
    addIngredient: ingName => dispatch(burgerActions.addIngredient(ingName)),
    removeIngredient: ingName => dispatch(burgerActions.removeIngredient(ingName)),
    initIngredientsPrices: () => dispatch(burgerActions.initIngredientsPrices()),
    setAuthRedirectPath: (path) => dispatch(burgerActions.setAuthRedirectPath(path))
});


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder));
