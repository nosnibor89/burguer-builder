import  React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    constructor(props){
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0 ;

        for (let param of query.entries()){
            if(param[0] === 'price'){
                price = +param[1];
                continue;
            }
            ingredients[param[0]] = +param[1]
        }

        this.state = {
            ingredients: ingredients,
            totalPrice: price,
        };

        this.childPath = this.props.match.path + '/contact-data';
        console.log(this.props.match.path)
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
        console.log(this.props)
        this.props.history.replace({pathname: this.childPath, search: this.props.location.search });
    }

    render(){
        return (
            <div>
                <CheckoutSummary
                    onPurchaseCancel={this.cancelCheckout}
                    onPurchaseContinue={this.continueCheckout}
                    ingredients={this.state.ingredients}/>

                <Route path={this.childPath} component={(props) => <ContactData {...props} ingredients={this.state.ingredients} price={this.state.totalPrice}/>}/>
            </div>
        )
    }
}

export default Checkout;