import * as actionTypes from './actionsTypes';
import OrdersApi from "../../api/orders";

export const purchaceBurgerSuccess = (orderId, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
});

export const purchaceBurgerFailed = error => ({
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
});

export const purchaceBurgerStarted = () => ({
    type: actionTypes.PURCHASE_BURGER_STARTED,
    loading: true,
});

export const tryPurchaceBurger = order => {
    return dispatch => {
        dispatch(purchaceBurgerStarted());

        OrdersApi.saveOrder({ingredients: order.ingredients, price: order.price, orderData: order.formData})
            .then((res) => {
                console.log(res.data);
                dispatch(purchaceBurgerSuccess(res.data, order));
            })
            .catch((err) => {
                dispatch(purchaceBurgerFailed(err));
                console.log("error: ", err);
                // this.props.onError(err.message);
            });
    }
}