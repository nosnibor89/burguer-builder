import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";
// import OrdersApi from "../../api/orders";
import {Loader} from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import {tryFetchOrders} from "../../store/actions";

class  Orders extends Component{
    componentDidMount(){
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render(){
        let orders =  this.props.orders.map((order) => <Order key={order.id} order={order} />);

        if(this.props.loading){
            orders = <Loader/>
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token, userId) => dispatch(tryFetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders));