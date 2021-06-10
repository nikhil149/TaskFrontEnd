import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Signup from './components/user/Signup'
import Signin from './components/user/Signin'
import Home from './components/core/Home'
import PrivateRoute from './components/auth/PrivateRoute'
import Dashboard from '../src/components/user/UserDashboard'


const Routes = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/signup' exact component={Signup}></Route>
                <Route path='/signin' exact component={Signin}></Route>
                <Route path='/' exact component={Home}></Route>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}></PrivateRoute>
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes