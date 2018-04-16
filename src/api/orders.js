import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://my-recipes-a5503.firebaseio.com'
});

class Orders {
    static saveOrder(order) {
        return instance.post('/burger-orders.json', order)
    }

    static getIngredients() {
        return instance.get('/ingredients.json');
    }
}

export default Orders;


