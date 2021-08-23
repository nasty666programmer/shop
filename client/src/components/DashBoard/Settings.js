import './dashboard_style.css';
import SettingsIcon from '@material-ui/icons/Settings';


function Settings() {
    return (
        <div className='wrapper_block'>
            <div className='wrapper_profile'>
            <div className='avatar_dashboard'>
                <SettingsIcon className='size_icons'/>
            </div>
            <div className='about_block'>
                Вы этом блоке вы можете изменить цвет и прочее
            </div>
            <div className='links_dashboard'>
                <div className='btn_profile'>
                    Настройка
                </div>
            </div>
            </div>
        </div>
    )
}

export default Settings;