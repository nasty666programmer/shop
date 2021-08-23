import './sign-in.css';
import {useState} from 'react';
import {signin} from '../../../request/auth';
import {useHistory} from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import Errors from '../Error';

function SignIn() {

    const [data,setData] = useState({
        email:'',
        password:''
    })
    const history = useHistory();
    const [error,setError] = useState()

    const handleChange = (e) => {
        const {name,value} = e.currentTarget;
        setData({...data,[name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await signin(data);
        console.log(res)
        if (res.data.token) {
            localStorage.setItem('token',res.data.token);
        }
        history.push(res.data.redirect)
        if (res.data.message) {
            setError(res.data.message)
        }
        setData({...data,email:'',password:''})
    }

    return (
        <div className='container_sign-in'>
            {!localStorage.getItem('token') ?             
             <div className='wrapper_sign-in'>
             <h1>Вход</h1>
             <div>{error && <p>{error}</p>}</div>
                 <form className='forms'  onSubmit={handleSubmit}>
                 {/* <div className='height_block'>
                    <LockIcon  className='icon_name'/>
                    <input type='text' 
                    className='name_input'
                    placeholder='Введите пароль'
                    />
                </div> */}
                    
                     <div className='field height_block'>
                     <EmailIcon className='icon_name'/>
                        <input 
                        type='email' 
                        name='email'
                        placeholder='email'
                        className='name_input'
                        onChange={handleChange}
                        />
                     </div>
                     <div className='field height_block'>
                     <LockIcon  className='icon_name'/>
                         <input 
                         type='password' 
                         name='password'
                         placeholder='password'
                         autoComplete='off'
                         className='name_input'
                         onChange={handleChange}
                         />
                     </div>
                    
                     <div className='btn_sign'>
                         <button >Войти</button>
                     </div>
                 </form>
             </div>
            : <Errors />
            }
           
        </div>
    )
}

export default SignIn;