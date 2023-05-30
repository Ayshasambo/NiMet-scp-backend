import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import IncomingFile from '../pages/IncomingFile'
import OutgoingFile from '../pages/OutgoingFile'
import User from '../pages/User'
import Alerts from '../pages/Alerts'
import ImpactBaseds from '../pages/ImpactBaseds'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/alerts' component={Alerts}/>
            <Route path='/impactbaseds' component={ImpactBaseds}/>
            <Route path='/users' component={Users}/>      
            <Route path='/incomingfile/:fileId' component={IncomingFile}/>
            <Route path='/outgoingfile/:fileId' component={OutgoingFile}/>
            <Route path='/user/:userId' component={User}/>       
        </Switch>
    )
}

export default Routes
