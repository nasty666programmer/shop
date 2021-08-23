import {useEffect,useState} from 'react';
import jwtDecode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom'


function PrivateRoute({component:Component,...rest}) {
    const [isAuth,setIsAuth] = useState(null);
    
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();
            console.log('tokenEdxp',tokenExpiration,'dateNow',dateNow.getTime()/1000)

            if (tokenExpiration < dateNow.getTime()/1000) {
                setIsAuth(false);
                localStorage.removeItem('token')
            }else {
                setIsAuth(true);
            }
        }else {
            setIsAuth(false);
        }
    },[])

    if(isAuth === null) {
        return <></>
    }
    return (
       <Route {...rest} render={props => 
        !isAuth ? (<Redirect to='/auth/sign-in' />) : (
            <Component {...props} />
        ) }/>
    )
}

export default PrivateRoute;