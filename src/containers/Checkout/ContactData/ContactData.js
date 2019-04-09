import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import WithErrorHandler from "../../../hoc/WithErrorHandler";
import Loader from "../../../components/UI/Loader/Loader";
import Input from "../../../components/UI/Input/Input";
import * as orderActions from "../../../store/actions";
import { checkValidity, updateObject } from "../../../shared/util";

const initialOrderFormState = {
  name: {
    element: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your name"
    },
    value: "",
    validation: {
      required: true
    },
    touched: false,
    valid: false
  },
  email: {
    element: "input",
    elementConfig: {
      type: "email",
      placeholder: "Your email"
    },
    value: "",
    validation: {
      required: true
    },
    touched: false,
    valid: false
  },
  street: {
    element: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your street"
    },
    value: "",
    validation: {
      required: true
    },
    touched: false,
    valid: false
  },
  postalCode: {
    element: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your postal code"
    },
    value: "",
    validation: {
      required: true
    },
    touched: false,
    valid: false
  },
  deliveryMethod: {
    element: "select",
    elementConfig: {
      options: [
        {
          value: "fastest",
          display: "Fastest"
        },
        {
          value: "cheapest",
          display: "Cheapest"
        }
      ]
    },
    value: "cheapest"
  }
};

const ContactData = props => {
  const [orderForm, setOrderForm] = useState(initialOrderFormState);
  const [formIsValid, setFormIsValid] = useState(false);

  const getFormData = () => {
    const form = {};
    for (const key in orderForm) {
      form[key] = orderForm[key].value;
    }

    return form;
  };

  const createOrder = event => {
    event.preventDefault();
    const formData = getFormData();
    props.tryPurchaseBurger(
      {
        ingredients: props.ingredients,
        price: props.price,
        userId: props.userId,
        formData
      },
      props.token
    );
  };

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

  const inputChangedHandler = (event, inputIdentifier) => {
    const newValue = event.target.value;
    const hasValidation = orderForm[inputIdentifier].validation;

    const updatedInput = updateObject(orderForm[inputIdentifier], {
      value: newValue,
      valid: hasValidation
        ? checkValidity(newValue, orderForm[inputIdentifier].validation)
        : false,
      touched: hasValidation ? true : false
    });

    const updatedForm = updateObject(orderForm, {
      [inputIdentifier]: updatedInput
    });

    const isFormValid = isValidForm(updatedForm);

    setOrderForm(updatedForm);
    setFormIsValid(isFormValid);
  };

  // Prepare form inputs
  const formElementArray = [];

  for (const key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key]
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

  // Add form inputs into form
  const form = (
    <div className={classes.ContactData}>
      <h4>Enter you contact information</h4>
      <form onSubmit={createOrder}>
        {formInputs}
        <Button type="Success" disabled={!formIsValid}>
          Order
        </Button>
      </form>
    </div>
  );

  // Display Loader while loading
  const contactData = !props.loading ? form : <Loader />;

  return contactData;
};

const mapStateToProps = state => ({
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  tryPurchaseBurger: (orderData, token) =>
    dispatch(orderActions.tryPurchaseBurger(orderData, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData));
