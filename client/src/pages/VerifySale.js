import {verifyProduct,confirmProductSale} from '../request/verifyProduct';
import {useEffect,useState} from 'react';
import '../components/Product/verifySale_confirm.css'


function VerifySale() {
    const [data,setData] = useState();

    useEffect(() => {
        if (!Array.isArray(data)) {
            async function getData() {
                let res = await verifyProduct();
                console.log(res)    
                setData(res.data.items_confirm);
            }
            getData();
        }
    },[])

    const handleSubmit = async(e,product) => {
        e.preventDefault();
        try{
            console.log(product)
            let response = await confirmProductSale(product);
            console.log(response)
        }catch(e) {
            console.log(e)
        }
   
    }

    return (
        <div className={'main_container'}>
            Подтвержения о продаже своих товаров
            {Array.isArray(data) && 
            data.map((el,i) => 
             {
                 return (
                <div key={i} >
                    <form  className='container_sale_product' onSubmit={(e) => handleSubmit(e,el)}>
                        <h1>{el.title}</h1> 
                        <i>{el.aboutProduct}</i>
                        <h3>{el.price}</h3>
                        <button>Подтвердить</button>
                    </form>
                </div>)
            })
            }
        </div>
    )
}

export default VerifySale;