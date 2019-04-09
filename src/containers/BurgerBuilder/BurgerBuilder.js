import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Auxiliar from "../../hoc/Auxiliar";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Loader from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import * as burgerActions from "../../store/actions";

const BurgerBuilder = props => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    props.initIngredientsPrices();
  }, []);

  /**
   * Check a burger as purchasable. Depends on the min ingredients given
   * @param ingredients
   * @returns {boolean}
   */
  const isPurchasable = (ingredients, minIngredients) => {
    let sum = 0;

    if (!ingredients) {
      return false;
    }

    for (const ingName of Object.keys(ingredients)) {
      if (ingredients[ingName] > 0) {
        sum++;
      }
    }

    return sum >= minIngredients;
  };

  const toggleOrderModal = () => {
    if (!props.isAuthenticated) {
      props.setAuthRedirectPath("/checkout");
      props.history.push("/auth");
      return;
    }
    setModalIsVisible(!modalIsVisible);
  };

  const purchase = () => {
    props.history.push({
      pathname: "/checkout"
    });
  };
  const disabledItems = { ...props.ingredients };
  Object.keys(disabledItems).forEach(
    key => (disabledItems[key] = props.ingredients[key] <= 0)
  );

  let orderSummary = (
    <OrderSummary
      price={props.totalPrice}
      ingredients={props.ingredients}
      onPurchaseCancel={toggleOrderModal}
      onPurchaseContinue={purchase}
    />
  );

  let burger = (
    <Auxiliar>
      <Burger ingredients={props.ingredients} />
      <BuildControls
        onIngredientAdd={props.addIngredient}
        onIngredientRemove={props.removeIngredient}
        disabledControls={disabledItems}
        onToggleBurgerOrder={toggleOrderModal}
        price={props.totalPrice}
        purchasable={isPurchasable(props.ingredients, 2)}
        isAuth={props.isAuthenticated}
      />
    </Auxiliar>
  );

  if (props.loading) {
    orderSummary = <Loader />;
  }

  if (props.loading && !props.ingredientsPrices) {
    burger = <Loader />;
  }

  if (props.hasError) {
    burger = <p>Could not load ingredients</p>;
  }

  return (
    <Auxiliar>
      <Modal show={modalIsVisible} onHideModal={toggleOrderModal}>
        {orderSummary}
      </Modal>

      {burger}
    </Auxiliar>
  );
};

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  hasError: state.burger.hasError,
  loading: state.burger.loading,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  addIngredient: ingName => dispatch(burgerActions.addIngredient(ingName)),
  removeIngredient: ingName =>
    dispatch(burgerActions.removeIngredient(ingName)),
  initIngredientsPrices: () => dispatch(burgerActions.initIngredientsPrices()),
  setAuthRedirectPath: path => dispatch(burgerActions.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder));
