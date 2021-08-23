import {useState,useEffect} from 'react';
import AllProductCard from '../components/Product/AllProductCard';

function AllProduct() {
    let [data,setData] = useState();

    
    return (
        <div>
        <AllProductCard />
        </div>
    )
}

export default AllProduct;