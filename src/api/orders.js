import axios from './axios';


// const instance = axios.create({
//     baseURL: 'https://my-recipes-a5503.firebaseio.com'
// });

class OrdersApi {
    static saveOrder(order) {
        return axios.post('/burger-orders.json', order)
    }

    static getOrders() {
        return axios.get('/burger-orders.json');
    }

    static getIngredients() {
        return axios.get('/ingredients.json');
    }
}

export default OrdersApi;


