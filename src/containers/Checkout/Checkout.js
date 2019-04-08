import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as orderActions from "../../store/actions";

const Checkout = props => {
  const childPath = props.match.path + "/contact-data";
  props.purchaseInit();

  const cancelCheckout = () => {
    props.history.goBack();
  };

  const continueCheckout = () => {
    props.history.replace({
      pathname: childPath,
      search: props.location.search
    });
  };

  let summary = <Redirect to="/" />;

  summary = props.purchased ? <Redirect to="/" /> : null;

  if (props.ingredients && !props.purchased) {
    summary = (
      <div>
        <CheckoutSummary
          onPurchaseCancel={cancelCheckout}
          onPurchaseContinue={continueCheckout}
          ingredients={props.ingredients}
        />

        <Route
          path={childPath}
          component={props => (
            <ContactData
              {...props}
              ingredients={props.ingredients}
              price={props.totalPrice}
            />
          )}
        />
      </div>
    );
  }

  return summary;
};
const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  purchased: state.order.purchased
});

const mapDispatchToProps = dispatch => ({
  purchaseInit: () => dispatch(orderActions.purchaseInit())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
