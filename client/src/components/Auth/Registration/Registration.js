import '../Sign-in/sign-in.css';
import {useState} from 'react';
import {registration} from '../../../request/auth';
import {useHistory} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import Errors from '../Error';

function Registration() {
    const [data,setData] = useState({
        email:'',
        password:'',
        name:'',
        file:null
    })
    const [error,setError] = useState();
    let history = useHistory();
    const handleChange = (e) => {
        const {name,value} = e.currentTarget;
        setData({...data,[name]:value})
    }


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await registration(data);
        
        history.push(res.data.redirect)
        if (res.data.message) {
            setError(res.data.message)
        }
       
        setData({...data,email:'',password:'',name:''})
    }


    return (
        <div>
            <div className='container_sign-in'>
                {!localStorage.getItem('token') ?
                <div className='wrapper_sign-in'>
                <h1>Регистрация</h1>
            {error && <p style={{'color':'red'}}>{error}</p>}
                <form className='forms' 
                onSubmit={handleSubmit}
                >
                    <div className='field height_block'>
                    <EmailIcon className='icon_name'/>
                       <input 
                       type='email' 
                       name='email'
                       onChange={handleChange}
                       className='name_input'
                       placeholder='email'
                       />
                    </div>
                    <div className='field height_block'>
                    <LockIcon  className='icon_name'/>
                        <input 
                        type='password' 
                        name='password'
                        placeholder='password'
                        className='name_input'
                        onChange={handleChange}
                        />
                    </div>
                    <div className='field height_block'>
                    <AccountCircleIcon className='icon_name'/>

                        <input 
                        type='text' 
                        name='name'
                        className='name_input'
                        placeholder='name'
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                    </div>
                    <div className='btn_sign_reg'>
                        <button >Зарегистрироваться</button>
                    </div>
                </form>
            </div>
                :
                    <Errors />
                }
           
        </div>
        </div>
    )
}

export default Registration;