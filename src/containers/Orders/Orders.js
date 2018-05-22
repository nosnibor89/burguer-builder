import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";
// import OrdersApi from "../../api/orders";
import {Loader} from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import {tryFetchOrders} from "../../store/actions";

class  Orders extends Component{

    // state = {
    //     orders : [],
    //     loading: true,
    // }

    componentDidMount(){
        // OrdersApi.getOrders()
        //     .then((res) => {
        //     console.log(res);
        //
        //     this.setState({orders: this.prepareOrders(res.data), loading: false})
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //
        //         this.setState({loading: false});
        //         this.props.onError('Error loading the orders');
        //     });
        this.props.fetchOrders();
    }

    // prepareOrders(data) {
    //     const orders = [];
    //     for (const i in data){
    //         const order = {
    //             ...data[i],
    //             id : i
    //         };
    //
    //         orders.push(order);
    //     }
    //     return orders;
    // }


    render(){
        // let orders =  this.state.orders.map((order) => <Order key={order.id} order={order} />);
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
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(tryFetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders));