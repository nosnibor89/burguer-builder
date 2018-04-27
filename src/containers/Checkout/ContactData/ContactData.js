import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import OrdersApi from "../../../api/orders";
import WithErrorHandler from "../../../hoc/WithErrorHandler";
import Loader from "../../../components/UI/Loader/Loader";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component{

    state = {
        orderForm: {
            name: {
                element: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: 'Robinson'
            },
            email: {
                element: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: 'nosnibor1989@gmail.com'
            },
            street: {
                element: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street',
                },
                value: 'Santo Domingo 1457'
            },
            postalCode: {
                element: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code',
                },
                value: '4322234'
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
                value: 'cheapest'
            },

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

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        console.log(inputIdentifier);

        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedInput = {
            ...updatedForm[inputIdentifier],
            value: event.target.value,
        };

        updatedForm[inputIdentifier] = updatedInput;

        this.setState({orderForm: updatedForm});

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
                    value={formInput.config.value} />
                )
            );

        // Add form inputs into form
        const form = (
            <div className={classes.ContactData}>
                <h4>Enter you contact information</h4>
                <form>
                    {/*<Input elementType={this.state.orderForm.name.element} elementConfig={this.state.orderForm.name.elementConfig} value={this.state.orderForm.name.value} />*/}
                    {/*<Input inputtype={'input'} placeholder='Email' type='email' name='email' />*/}
                    {/*<Input inputtype={'input'} placeholder='Street' type='text' name='street' />*/}
                    {/*<Input inputtype={'input'} placeholder='Postal' type='text' name='postal' />*/}

                    {/*<Input inputtype={'input'} placeholder='Name' type='text' name='name' />*/}
                    {/*<Input inputtype={'input'} placeholder='Email' type='email' name='email' />*/}
                    {/*<Input inputtype={'input'} placeholder='Street' type='text' name='street' />*/}
                    {/*<Input inputtype={'input'} placeholder='Postal' type='text' name='postal' />*/}

                    {/*<input className={classes.Input} type="text" name="name"/>*/}
                    {/*<input className={classes.Input} type="email" name="email"/>*/}
                    {/*<input className={classes.Input} type="text" name="street"/>*/}
                    {/*<input className={classes.Input} type="text" name="street"/>*/}

                    {formInputs}

                    <Button type="Success" onClick={this.createOrder}>Order</Button>
                </form>
            </div>
        );

        // Display Loader while loading
        const contactData = !this.state.loading ? form : <Loader/>;

        return (
            contactData
        );
    }
}

export default  WithErrorHandler(ContactData);