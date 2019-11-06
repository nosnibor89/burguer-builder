import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as authActions from "../../store/actions";
import Loader from "../../components/UI/Loader/Loader";
import { checkValidity, updateObject } from "../../shared/util";
import WithErrorHandler from "../../hoc/WithErrorHandler";

const initialControlsState = {
  email: {
    element: "input",
    elementConfig: {
      type: "email",
      placeholder: "Email Address"
    },
    value: "",
    validation: {
      required: true,
      isEmail: true
    },
    touched: false,
    valid: false
  },
  password: {
    element: "input",
    elementConfig: {
      type: "password",
      placeholder: "Password"
    },
    value: "",
    validation: {
      required: true,
      minLength: 6
    },
    touched: false,
    valid: false
  }
};

const Auth = props => {
  const [controls, setControls] = useState(initialControlsState);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!props.isBuildingBurger && props.authRedirectPath !== "/") {
      props.setAuthRedirectPath("/");
    }
  }, []);

  const isValidForm = form => {
    let isValid = true;
    for (const i in form) {
      const input = form[i];
      if (input.validation && !input.valid) {
        isValid = false;
      }
    }

    return isValid;
  };

  const switchAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const newValue = event.target.value;
    const hasValidation = controls[inputIdentifier].validation;

    const updatedForm = updateObject(controls, {
      [inputIdentifier]: updateObject(controls[inputIdentifier], {
        value: newValue,
        valid: hasValidation
          ? checkValidity(newValue, controls[inputIdentifier].validation)
          : false,
        touched: hasValidation ? true : false
      })
    });

    const formIsValid = isValidForm(updatedForm);

    setControls(updatedForm);
    setFormIsValid(formIsValid);
  };

  const submit = event => {
    event.preventDefault();
    props.tryAuth(controls.email.value, controls.password.value, isSignUp);
  };

  if (props.isAuthenticated) {
    return <Redirect to={props.authRedirectPath} />;
  }

  const formElementArray = [];

  for (const key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key]
    });
  }

  const formInputs = formElementArray.map(formInput => (
    <Input
      key={formInput.id}
      onChange={event => inputChangedHandler(event, formInput.id)}
      elementType={formInput.config.element}
      elementConfig={formInput.config.elementConfig}
      invalid={!formInput.config.valid}
      touched={formInput.config.touched}
      validation={formInput.config.validation}
      value={formInput.config.value}
    />
  ));

  let errorMsg = null;

  if (props.error) {
    errorMsg = <p>{props.error.message}</p>;
  }

  let auth = (
    <div className={classes.Auth}>
      <form onSubmit={submit}>
        {formInputs}
        {errorMsg}
        <Button type="Success" disabled={!formIsValid}>
          {isSignUp ? "SignUp" : "SignIn"}
        </Button>
      </form>

      <Button type="Link" onClick={switchAuthMode}>
        {!isSignUp ? "SignUp" : "SignIn"}
      </Button>
    </div>
  );

  if (props.loading) {
    auth = <Loader />;
  }

  return auth;
};
const mapStatetoProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  isBuildingBurger: state.burger.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchtoProps = dispatch => ({
  tryAuth: (username, password, signUp) =>
    dispatch(authActions.tryAuth(username, password, signUp)),
  setAuthRedirectPath: path => dispatch(authActions.setAuthRedirectPath(path))
});

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(WithErrorHandler(Auth));
