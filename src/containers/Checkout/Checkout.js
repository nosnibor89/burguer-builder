import  React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';

class Checkout extends Component {

    constructor(props){
        super(props);
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0 ;

        // for (let param of query.entries()){
        //     if(param[0] === 'price'){
        //         price = +param[1];
        //         continue;
        //     }
        //     ingredients[param[0]] = +param[1]
        // }

        // this.state = {
        //     ingredients: ingredients,
        //     totalPrice: price,
        // };

        this.childPath = props.match.path + '/contact-data';
        console.log(props.match.path)
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
                    ingredients={this.props.ingredients}/>

                <Route path={this.childPath} component={(props) => <ContactData {...props} ingredients={this.props.ingredients} price={this.props.totalPrice}/>}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
});

export default connect(mapStateToProps)(Checkout);