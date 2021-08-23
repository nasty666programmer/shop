import './dashboard_style.css';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {Link} from 'react-router-dom';

function ProfileDashboard () {
    return (
        <div className='wrapper_block'>
            <div className='wrapper_profile'>
            <div className='avatar_dashboard'>
                <PermIdentityIcon className='size_icons'/>
            </div>
            <div className='about_block'>
                В данном блоке можете просмотреть свои данные и изменить их
            </div>
            <div className='links_dashboard'>
                <div className='btn_profile'>
                    <Link to='/profile'>Перейти в профиль</Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProfileDashboard;