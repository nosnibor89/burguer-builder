import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://my-recipes-a5503.firebaseio.com'
});

export default instance;