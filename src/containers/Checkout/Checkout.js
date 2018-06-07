import  React, { Component } from 'react';
import {Route, Redirect} from "react-router-dom";
import { connect } from 'react-redux';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as orderActions from '../../store/actions';

class Checkout extends Component {

    constructor(props){
        super(props);
        this.childPath = props.match.path + '/contact-data';
        this.props.purchaseInit();
    }

    /** Test the theory of no lifecycle with redux **/
    // componentWillReceiveProps(props, state){
    //     console.log('[componentWillReceiveProps]');
    //     console.log(props);
    //     console.log(state);
    //
    // }

    // componentWillUpdate(nextProps, nextState){
    //     console.log('[componentWillUpdate]');
    //     console.log(nextProps);
    //     console.log(nextState);
    // }

    /** Test the theory of no lifecycle with redux **/

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace({pathname: this.childPath, search: this.props.location.search });
    }

    render(){

        let summary = <Redirect to="/"/>;

        summary = this.props.purchased ? <Redirect to="/"/> : null;

        if(this.props.ingredients && !this.props.purchased){
            summary = (
                <div>
                    <CheckoutSummary
                        onPurchaseCancel={this.cancelCheckout}
                        onPurchaseContinue={this.continueCheckout}
                        ingredients={this.props.ingredients}/>

                    <Route path={this.childPath} component={(props) => <ContactData {...props} ingredients={this.props.ingredients} price={this.props.totalPrice}/>}/>
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchased: state.order.purchased,
});

const mapDispatchToProps = dispatch => ({
    purchaseInit: () => dispatch(orderActions.purchaseInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);