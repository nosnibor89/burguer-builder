import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import OrdersApi from "../../../api/orders";
import WithErrorHandler from "../../../hoc/WithErrorHandler";
import Loader from "../../../components/UI/Loader/Loader";

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    createOrder = (event) => {
        event.preventDefault();

        console.log(this.props.ingredients)

        this.setState({loading: true});

        OrdersApi.saveOrder({ingredients: this.props.ingredients, price: this.props.price})
            .then((res) => {
                console.log(res);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({loading: false});
                console.log("error: ", err);
                this.props.onError(err.message);
            });

    }

    render(){

        const contactData = !this.state.loading ? (
            <div className={classes.ContactData}>
            <h4>Enter you contact information</h4>
            <form action="">
                <input className={classes.Input} type="text" name="name"/>
                <input className={classes.Input} type="email" name="email"/>
                <input className={classes.Input} type="text" name="street"/>
                <input className={classes.Input} type="text" name="street"/>

                <Button type="Success" onClick={this.createOrder}>Order</Button>
            </form>
        </div>
        ) : <Loader/>;

        return (
            contactData
        );
    }
}

export default  WithErrorHandler(ContactData);