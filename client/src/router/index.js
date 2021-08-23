import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Registration from '../components/Auth/Registration/Registration';
import SignIn from '../components/Auth/Sign-in/SignIn';
import Header from '../components/Home/Header';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute';
import {useHistory} from 'react-router-dom'
import CreateProduct from '../pages/CreateProduct';
import AllProduct from '../pages/AllProduct';
import VerifySale from '../pages/VerifySale';

function IndexRouter () {
    const history = useHistory();
    return (
        <Router history={history}>
            <Header />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route  path='/auth/sign-in'>
                    <SignIn />
                </Route>
                <Route  path='/auth/registration'>
                    <Registration />
                </Route>
                <PrivateRoute  path={'/dashboard'} component={Dashboard} />
                <PrivateRoute  path={'/profile'} component={Profile} />
                <PrivateRoute  path={'/create-product'} component={CreateProduct} />
                <PrivateRoute  path={'/product/all'} component={AllProduct} />
                <PrivateRoute  path={'/verify-sale'} component={VerifySale} />
               
            </Switch>
        </Router>
    )
}

export default IndexRouter;
