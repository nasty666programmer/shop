import {Link} from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';

function CreateProductCard() {
    return (
        <div>
            <div className='wrapper_block'>
            <div className='wrapper_profile'>
            <div className='avatar_dashboard'>
                <CreateIcon className='size_icons'/>
            </div>
            <div className='about_block'>
                Вы можете прямо сейчас создать объявление и продать свой товар
            </div>
            <div className='links_dashboard'>
                <div className='btn_profile'>
                    <Link to='/create-product'>Создать объявление</Link>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default CreateProductCard;