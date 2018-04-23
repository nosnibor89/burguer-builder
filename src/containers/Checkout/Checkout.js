import  React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {


    constructor(props){
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query.entries()){
            ingredients[param[0]] = +param[1]
        }

        this.state = {
            ingredients: ingredients
        };

    }

    // This works but it triggers an extra rendering, so it's better use in the constructor
    // componentDidMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //
    //     for (let param of query.entries()){
    //         ingredients[param[0]] = +param[1]
    //     }
    //
    //     this.setState({ingredients: ingredients});
    // }

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary
                    onPurchaseCancel={this.cancelCheckout}
                    onPurchaseContinue={this.cancelCheckout}
                    ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default Checkout;