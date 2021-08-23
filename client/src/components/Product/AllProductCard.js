import {productAll,buyProduct} from '../../request/product';
import {useState,useEffect} from 'react';

function AllProductCard() {
    let [data,setData] = useState();

    useEffect(async() => {
        let res = await productAll();
        setData(res.data.product);
    },[])

     const toCurrency = (price) => {
        return  new Intl.NumberFormat('en-US',{
               currency:'USD',
               style:'currency'
           }).format(price)
       }
       
       const [idProduct,setIdProduct] = useState();

       const handleSubmit = async(e,id) => {
           e.preventDefault();
           let res = await buyProduct({id});
        }

    return (
        <div className='wrapItem'>
            {console.log(data)}
            {data && 
            data.map(el => {

            return <div className='wrapper_data_product'>
               <div className='data_user_product_all'>
                   <div className='data_user_name'>
                <span>{el.userId.email}</span>
                    </div>
                    <div className='data_user_name'>
                <span id='name_u_p'>{el.userId.name}</span>
                    </div>
                    <img className={'data_user_product_photo'} src={`../${el.userId.avatarUrl}`} alt='s'/>
                </div>
               
                <div>
                    <div className='container_data_product'>
                        <div className='data_product_img_title'>
                            <div className='img_product'>
                                <img src={`../${el.images}`} alt='s'/>
                            </div>
                            <div id='title_product_all'>
                                {el.aboutProduct}
                            </div>
                        </div>
                        <div className='product_about_text'>
                        {el.title}

                        </div>                        
                <hr />
                <div id='price_action_product'>
                    <div id='price_product'>{toCurrency(el.price)}</div>
                    <div id='action_product'>
                        
                            <input type='hidden' name='id_product' value={el._id}/>
                               <button onClick={(e) => handleSubmit(e,el._id)} id='green' className='send_product_message'>Buy</button> 
                       
                        <div className='send_product_message'>
                            Send
                        </div>
                    </div>                
                </div>
                </div>
                    </div>
                
            </div>
            })}
        </div>
    )
}

export default AllProductCard;