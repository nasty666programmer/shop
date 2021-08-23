import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import './error.css';

function Errors(props) {
    return (
        <div className='error_container'>
            <div className='info_error'>
                <span><strong>{props.data.name}</strong>, вы уже вошли в аккаунт</span>
            </div>
            <div className='select_action_error'>
                <div className='link_action'>
                    <Link to='/dashboard'>Главное меню</Link>
                </div>
                <div className='link_action'> 
                    <Link to='/log-out'>Выйти с аккаунта</Link>
                </div>
                <div className='link_action'>
                    <Link to='/profile'>Профиль</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        data:state.user
    }
}

export default connect(mapStateToProps,null)(Errors);