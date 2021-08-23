import './home_page.css';
import {Link} from 'react-router-dom';
import QuickMenu from '../Profile/QuickMenu'
import ProfileQuick from '../../pages/ProfielQuick';
import {connect} from 'react-redux';
import {logout} from '../../request/auth'
import {useHistory} from 'react-router-dom';
import {deleteUser} from '../../store/action';
import GitHubIcon from '@material-ui/icons/GitHub';
import OrdersMenu from '../Orders/OrdersMenu';

function Header (props) {
    let history = useHistory();
    const logOut = async() => {
        localStorage.removeItem('token')
            props.deleteUser({})
        let res = await logout();
        history.push(res.data.redirect)
        
    } 

    return (
        <div className='sticky_header'>
            <header id='header'>
                <div>
                Shop
                </div>
                <div className='link_us'>
                {Object.keys(props.data.user).length !== 0 && 
                    <Link  className='border' to='/product/all'>Продукты</Link>
                }
                    <Link className='border' to='/about'>О нас</Link>
                    <a className='border' href='#'>
                        <GitHubIcon />
                    </a>
                </div>  
                {console.log(Object.values(props.data.user))}            
                {localStorage.getItem('token') ? 
              
                    <div className='auth_btn'>
                    <div className='border'>
                        <OrdersMenu />
                    </div>
                    <div className='border'>
                        <ProfileQuick /> 
                    </div>
                    <div>
                        <button className='logout-btn' onClick={logOut}>
                            Выйти
                        </button> 
                    </div>
                    
                </div>:
                     <div className='auth_btn'>
                     <div className='border'>
                      <Link to='/auth/sign-in'>Войти</Link>
                     </div>
                     <div className='registration_btn border'>
                     <Link to='/auth/registration'>Зарегистрироваться</Link>
                     </div>
                     </div>
                } 
                
            </header>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data:state
    }
}

const mapDispatchToProps = {
    deleteUser
}


export default connect(mapStateToProps,mapDispatchToProps)(Header);