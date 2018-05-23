import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import * as authActions from '../../store/actions';


class Auth extends Component{

    state = {
        controls: {
            email: {
                element: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                touched: false,
                valid: false,
            },
            password: {
                element: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                touched: false,
                valid: false,
            },
        },
        formIsValid: false,
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
            ...this.state.controls
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

        this.setState({controls: updatedForm, formIsValid: formIsValid});

    }

    submit = (event) => {
        event.preventDefault();
        this.props.tryAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render(){
        const formElementArray = [];

        for(const key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
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

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submit}>
                    {formInputs}
                    <Button type="Success" disabled={!this.state.formIsValid}>Start</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchtoProps = dispatch => ({
    tryAuth: (username, password) => dispatch(authActions.tryAuth(username, password)),
})


export default connect(null, mapDispatchtoProps)(Auth);