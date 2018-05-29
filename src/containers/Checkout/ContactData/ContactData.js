import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import WithErrorHandler from "../../../hoc/WithErrorHandler";
import Loader from "../../../components/UI/Loader/Loader";
import Input from "../../../components/UI/Input/Input";
import * as orderActions from "../../../store/actions";

class ContactData extends Component{

    state = {
        orderForm: {
            name: {
                element: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
            },
            email: {
                element: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
            },
            street: {
                element: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
            },
            postalCode: {
                element: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
            },
            deliveryMethod: {
                element: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        display: 'Fastest'
                    },{
                        value: 'cheapest',
                        display: 'Cheapest'
                    }]
                },
                value: 'cheapest',
            },

        },
        loading: false,
        formIsValid: false,
    };

    getFormData= () => {
        const form = {};
        for (const key in this.state.orderForm) {
            form[key] = this.state.orderForm[key].value;
        }

        return form;
    }

    createOrder = (event) => {
        event.preventDefault();

        console.log(this.props.ingredients)

        const formData = this.getFormData();

        this.props.tryPurchaseBurger({ingredients: this.props.ingredients, price: this.props.price, userId: this.props.userId, formData}, this.props.token);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if(rules && rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    isValidForm(form) {
        let isValid = true;
        for (const i in form){
            const input = form[i];
            if(input.validation && !input.valid){
                isValid = false;
            }
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const newValue = event.target.value;

        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedInput = {
            ...updatedForm[inputIdentifier],
            value: newValue,
        };

        //Update validation settings
        if(updatedForm[inputIdentifier].validation){
            updatedInput.valid = this.checkValidity(newValue, updatedForm[inputIdentifier].validation);
            updatedInput.touched = true;
        }


        updatedForm[inputIdentifier] = updatedInput;

        const formIsValid = this.isValidForm(updatedForm);

        this.setState({orderForm: updatedForm, formIsValid: formIsValid});

    }

    render(){
        // Prepare form inputs
        const formElementArray = [];

        for(const key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        const formInputs =  formElementArray.map(formInput =>
                (
                    <Input key={formInput.id}
                    onChange={(event) => this.inputChangedHandler(event, formInput.id)}
                    elementType={formInput.config.element}
                    elementConfig={formInput.config.elementConfig}
                    invalid={!formInput.config.valid}
                    touched={formInput.config.touched}
                    validation={formInput.config.validation}
                    value={formInput.config.value} />
                )
            );

        // Add form inputs into form
        const form = (
            <div className={classes.ContactData}>
                <h4>Enter you contact information</h4>
                <form onSubmit={this.createOrder}>
                    {formInputs}
                    <Button type="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
            </div>
        );

        // Display Loader while loading
        const contactData = !this.props.loading ? form : <Loader/>;

        return (
            contactData
        );
    }
}

const mapStateToProps = state => ({
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
    tryPurchaseBurger: (orderData, token) => dispatch(orderActions.tryPurchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData));