import axios from './axios';


const firebaseKey = 'AIzaSyDjGtamiUdYg0K-n6ujbHUcsTQpWD1AtC8';

const firebaseAPI = {
    signUp: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${firebaseKey}`,
    signIn: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${firebaseKey}`,
}



class AuthApi {
    static signUp({email, password}) {
        return axios.post(firebaseAPI.signUp, {email, password, returnSecureToken: true});
    }

    static signIn({email, password}) {
        return axios.post(firebaseAPI.signIn, {email, password, returnSecureToken: true});
    }
}

export default AuthApi;