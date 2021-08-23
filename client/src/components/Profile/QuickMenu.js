import { useState } from 'react';
import './profile.css';
import ReactDOM  from 'react-dom';
import MenuProfileQuick from './MenuProfileQuick';
import FaceIcon from '@material-ui/icons/Face';


function QuickMenu() {
    const [flag,setFlag] = useState(false);
    return (
        <div>
            {/* <div className='logoProfile' onClick={() => setFlag(!flag)}>

            </div> */}

            <FaceIcon onClick={() => setFlag(!flag)}/>


            {flag && ReactDOM.createPortal(
                <MenuProfileQuick />
                ,document.getElementById('modal')
            )}
        </div>
    )
}

export default QuickMenu;