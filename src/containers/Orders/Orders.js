import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import { Loader } from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import { tryFetchOrders } from "../../store/actions";

const Orders = props => {
  // Fetch orders
  useEffect(() => {
    props.fetchOrders(props.token, props.userId);
  }, []);

  //Check error
  useEffect(() => {
    const { error, onError } = props;
    if (error) {
      onError(error);
    }
  }, [props.error]);

  let orders = props.orders.map(order => (
    <Order key={order.id} order={order} />
  ));

  if (props.loading) {
    orders = <Loader />;
  }

  return <div>{orders}</div>;
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
  error: state.order.error
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, userId) => dispatch(tryFetchOrders(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders));
