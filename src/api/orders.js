import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://my-recipes-a5503.firebaseio.com'
});

class OrdersApi {
    static saveOrder(order) {
        return instance.post('/burger-orders.json', order)
    }

    static getOrders() {
        return instance.get('/burger-orders.json');
    }

    static getIngredients() {
        return instance.get('/ingredients.json');
    }
}

export default OrdersApi;


