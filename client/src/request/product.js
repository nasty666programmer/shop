import axios from 'axios';


export async function createProduct(data) {
    try {
        let response = await axios.post('/product/create',data);
        let result = await response;
        return result;
    }catch(e) {
        console.log(e)
    }
}

export async function productAll() {
    try {
        let response = await axios.get('/product/all');
        let result = await response;
        return result;
    }catch(e) {
        console.log(e)
    }
}

export async function buyProduct(data) {
    try{
        let response = await axios.post('/orders/add',data);
        let result = await result;
        return result;
    }catch(e){
        console.log(e)
    }
}

export async function getProductOrder() {
    try{
        let response = await axios.get('/orders');
        let result = await response;
        return result;
    }catch(e){
        console.log(e)
    }
}

export async function deleteProductOrders(data) {
    try{
        let response = await axios.delete(`/orders/delete/${data._id}`,data);
        let result = await response;
        return result;
    }catch(e){
        console.log(e)
    }
}

export async function confirmProduct(data,user) {
    try {
        let response = await axios.post('/orders/buy-product',data)
        let result = await response;
        return result;
    }catch(err) {
        console.log(err)
    }
}