import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import * as authActions from '../../store/actions';
import Loader from "../../components/UI/Loader/Loader";
import {checkValidity, updateObject} from "../../shared/util";
import WithErrorHandler from '../../hoc/WithErrorHandler';


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
        isSignUp: false,
    }

    componentDidMount(){
        if(!this.props.isBuildingBurger && this.props.authRedirectPath !== '/'){
            this.props.setAuthRedirectPath('/');
        }
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

    switchAuthMode = () => {
        this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const newValue = event.target.value;
        const hasValidation = this.state.controls[inputIdentifier].validation;

        const updatedForm = updateObject(this.state.controls, {
            [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
                value: newValue,
                valid: hasValidation ? checkValidity(newValue, this.state.controls[inputIdentifier].validation) : false,
                touched: hasValidation ? true : false,
            }),
        });

        const formIsValid = this.isValidForm(updatedForm);

        this.setState({controls: updatedForm, formIsValid: formIsValid});
    }

    submit = (event) => {
        event.preventDefault();
        this.props.tryAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render(){

        if(this.props.isAuthenticated){
            return <Redirect to={this.props.authRedirectPath}/>
        }

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

        let errorMsg = null;

        if(this.props.error){
            errorMsg = <p>{this.props.error.message}</p>;
        }

        let auth = (
            <div className={classes.Auth}>
                <form onSubmit={this.submit}>
                    {formInputs}
                    {errorMsg}
                    <Button type="Success" disabled={!this.state.formIsValid}>{this.state.isSignUp ? 'SignUp': 'SignIn'}</Button>
                </form>

                <Button type="Link" onClick={this.switchAuthMode} >{!this.state.isSignUp ? 'SignUp': 'SignIn'}</Button>
            </div>
        );

        if(this.props.loading){
            auth = <Loader/>
        }


        return auth;
    }
}

const mapStatetoProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuildingBurger: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchtoProps = dispatch => ({
    tryAuth: (username, password, signUp) => dispatch(authActions.tryAuth(username, password, signUp)),
    setAuthRedirectPath: (path) => dispatch(authActions.setAuthRedirectPath(path)),
});


export default connect(mapStatetoProps, mapDispatchtoProps)(WithErrorHandler(Auth));