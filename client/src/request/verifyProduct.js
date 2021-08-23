import axios from 'axios';


export async function verifyProduct() {
    try {
        let response = axios.get('/confirm/verify-sale');
        let result = await response;
        console.log(result)
        return result;
    }catch(err) {
        console.log(err)
    }
}

export async function confirmProductSale(data) {
    try {
        const response = await axios.post('/confirm/verify-sale/success-sale',data)
        const result = await response;
        return result
    }catch(e) { 
        console.log(e)
    }
}