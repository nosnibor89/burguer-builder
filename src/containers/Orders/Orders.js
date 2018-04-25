import React, { Component } from 'react';
import Order from "../../components/Order/Order";
import OrdersApi from "../../api/orders";
import {Loader} from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/WithErrorHandler";

class  Orders extends Component{

    state = {
        orders : [],
        loading: true,
    }

    componentDidMount(){
        OrdersApi.getOrders()
            .then((res) => {
            console.log(res);

            this.setState({orders: this.prepareOrders(res.data), loading: false})
            })
            .catch((err) => {
                console.log(err);

                this.setState({loading: false});
                this.props.onError('Error loading the orders');
            });
    }

    prepareOrders(data) {
        const orders = [];
        for (const i in data){
            const order = {
                ...data[i],
                id : i
            };

            orders.push(order);
        }
        return orders;
    }


    render(){
        let orders =  this.state.orders.map((order) => <Order key={order.id} order={order} />);

        if(this.state.loading){
            orders = <Loader/>
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default WithErrorHandler(Orders);