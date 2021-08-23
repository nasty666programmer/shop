import axios from 'axios';
import {history} from '../router/history';


export async function signin (data) {
    let response = await axios.post('/auth/sign-in',data);
    let result = await response;
    return result;
    
}

export async function registration(data) {
    let response = await axios.post('/auth/registration',data)
    let result = await response;

    return result;
}

export async function logout() {
    let response = await axios.get('/auth/logout');
    let res = await response;
    return res;
}