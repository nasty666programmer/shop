import {getProductOrder,deleteProductOrders,confirmProduct} from '../../request/product';
import {useState,useEffect} from 'react';
import './orders.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function OrdersModale() {
let [data,setData] = useState();
let [flag,setFlag] = useState(true)
let [priceAll,setPriceAll] = useState();
let [confirm,setConfirm] = useState();
let [user,setUser] = useState();

    useEffect(() => {
        async function getData() {
            if (flag) {
                let res = await getProductOrder();
                setData(res.data.product)
                setUser(res.data.user_id);
                setPriceAll(res.data.price)
                setFlag(false)
            }
        }
        getData();
    })

    const handleSubmit = async(e,el) => {
        e.preventDefault();
        let response = await deleteProductOrders(el);
        console.log(response)
    }

    const buyProductInCart = async(e,el) => {
        e.preventDefault();
        let s = data.map(el => { 
            Object.defineProperty(el,'user_pending',{
                    value:user,
                    writable: true,
                    enumerable: true,
                    configurable: true
                })
                return el
        })
        console.log(s)
        if (el.length) {
            let response = await confirmProduct(s);
            setConfirm(true);    
        }       
    }

    
    return confirm  ? 
            <div className='modale_confirm'>
            <div id='confirm_icon'>
                <CheckCircleIcon id='circle_icon'/>
            </div>
            <div id='confirm_message'>
                Запрос отправлен! Продавцам отправленно на email инструкцию по подтверждению заказа.
                Ждите их ответ.
            </div>
            <div id='confirm_action'>
                <button onClick={() => setConfirm(false)}>Ok</button>
            </div>
        </div>
       : 
       <div className='container_orders'>
       <div className='header_orders'>
           Корзина Заказов                
       </div>
       <div className='wrapper_orders'>
           {data && data.map((el,i) => <div>
           <div key={i} className='wrapper_item'>
               <div className='data_product_orders'>
                   <div>
                       <img id='orders_img' src={`../${el.images}`} alt={el.title}/>
                   </div>
                   <div className='orders_item_name' id='padding'>{el.title}</div>
                   <div id='padding'>{el.price}$</div>
               </div>
               <div className='wrapper_action_order'>
                   {/* <div className='action_orders'> */}
                      <button onClick={(e) => handleSubmit(e,el)} className='action_orders'>Удалить</button> 
                   {/* </div> */}
               </div>
              
           </div>
           </div>
           )}
       </div>
       <div className='buy_product_in_cart'>
           <button onClick={(e) => buyProductInCart(e,data)}>Buy</button>
       </div>
       <div className='result_item_price'>
           <div>Итого: {priceAll}$</div>
       </div>
   </div>
    }

export default OrdersModale;