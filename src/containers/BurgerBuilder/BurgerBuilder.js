import React, { Component } from 'react'
import Auxiliar from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Orders from "../../api/orders";
import Loader from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/WithErrorHandler";

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.6
// };

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
    loading: false,
};

class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }


    state = initialState;
    ingredientsPrices = null;

    componentDidMount(){
        this.isLoading();

        Orders.getIngredients()
            .then((res) =>{
                this.ingredientsPrices = res.data
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({loading: false, modalIsVisible: false})
                console.log("error: ", err);
                this.props.onError(err.message);
            });
    }


    calcBurger(type, operation) {
        this.setState((prevState, props) => {
            const newIngredients = {
                ...prevState.ingredients,
                [type]: operation === 'add' ? +prevState.ingredients[type] + 1 : +prevState.ingredients[type] - 1
            };
            const newPrice = operation === 'add' ? +prevState.totalPrice + this.ingredientsPrices[type] : +prevState.totalPrice - this.ingredientsPrices[type];

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

    isLoading(){
        this.setState({loading: true});
    }

    purchase = () => {
        this.isLoading();

        Orders.saveOrder({ingredients: this.state.ingredients, price: this.state.totalPrice})
            .then((res) => {
                console.log(res);
                this.setState(initialState);
            })
            .catch((err) => {
                this.setState({loading: false, modalIsVisible: false})
                console.log("error: ", err);
                this.props.onError(err.message);
            });
    }

    render() {

        const disabledItems = {...this.state.ingredients};
        Object.keys(disabledItems).forEach((key) => disabledItems[key] = this.state.ingredients[key] <= 0);

        let orderSummary = (
            <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                onPurchaseCancel={this.toggleOrderModal}
                onPurchaseContinue={this.purchase}></OrderSummary>
        );

        let burger = (
            <Auxiliar>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onIngredientAdd={this.addIngredientHandler}
                    onIngredientRemove={this.removeIngredientHandler} disabledControls={disabledItems}
                    onToggleBurgerOrder={this.toggleOrderModal}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}/>
            </Auxiliar>
        )

        if (this.state.loading){
            orderSummary = <Loader/>

        }

        if(this.state.loading && !this.ingredientsPrices){
            burger = <Loader/>
        }

        return (
            <Auxiliar>
                <Modal show={this.state.modalIsVisible} onHideModal={this.toggleOrderModal}>
                    {orderSummary}
                </Modal>

                { burger }


            </Auxiliar>
        )
    }
}


export default WithErrorHandler(BurgerBuilder);
