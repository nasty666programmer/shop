import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ReactDOM from 'react-dom'
import {useState} from 'react';
import OrdersModale from './OrdersModale';

function OrdersMenu() {
    const [flag,setFlag] = useState(false);
    
    return (
        <div>
            <ShoppingBasketIcon onClick={() => setFlag(!flag)}/>
            {flag && ReactDOM.createPortal(
                <OrdersModale />
            ,document.getElementById('modal')
            )}
        </div>
    )
}

export default OrdersMenu;