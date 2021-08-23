import CardExample from "./CardExample";
import './home_page.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FaceIcon from '@material-ui/icons/Face';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const icons = [{
    img:<ShoppingCartIcon />,
    text:' Выгодные покупки на любой вкус и кошелёк'
},{
    img:<FaceIcon />,
    text:'Миллионы довольных покупателей'
},{
    img:<AttachMoneyIcon />,
    text:'Доступные цены'
}]

function Main () {
    return (
        <div className='container'>
            {icons.map((el,i) => 
            <CardExample img={el.img} text={el.text}/>)}
        </div>
    )
}

export default Main;