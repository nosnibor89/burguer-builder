import axios from './axios';

class OrdersApi {
    static saveOrder(order, token) {
        return axios.post(`/burger-orders.json?auth=${token}`, order);
    }

    static getOrders(token, params) {
        return axios.get(`/burger-orders.json?auth=${token}&${params}`);
    }

    static getIngredients() {
        return axios.get('/ingredients.json');
    }
}

export default OrdersApi;