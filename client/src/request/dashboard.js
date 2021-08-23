import axios from 'axios';

export async function dashboard(data) {
    // let response = axios.get('/main/dashboard');
    let response = axios.get(`/dashboard`)
    let res = await response;
    console.log(res)
    return res;
}