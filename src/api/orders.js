import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://my-recipes-a5503.firebaseio.com'
});

class Orders {
    static async saveOrder(order) {
        await instance.post('/burger-orders.json', order)
    }
}

export default Orders;


