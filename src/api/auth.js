import axios from './axios';


const firebaseAPI = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDjGtamiUdYg0K-n6ujbHUcsTQpWD1AtC8';


class AuthApi {
    static getToken({email, password}) {
        return axios.post(firebaseAPI, {email, password, returnSecureToken: true});
    }
}

export default AuthApi;