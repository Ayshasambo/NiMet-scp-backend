import React, {useContext, useEffect} from 'react';

import Layout from './components/layout/Layout'
import Login from './pages/Login/Login';
import { AuthContext } from './context/authContext/AuthContext'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from './redux/actions/ThemeAction'
import Dashboard from './pages/Dashboard';
import ImpactBaseds from './pages/ImpactBaseds';


function App(props) {
    const { user } = useContext(AuthContext);
    
    const themeReducer = useSelector(state => state.ThemeReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])



    return ( 
    //   <Router>   
    //   <Switch>
    //   <Route exact path="/">
    //       {user ? <Layout /> : <Redirect to="/login" />}
    //     </Route>
    //  <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
      
    //   {user && (
    //   <>
    //   <Route path='/' > <Layout /> </Route>
    //     </>
    //   )}       
    //   </Switch>
    //   </Router>
    <Layout />   
    )
  }
  
  export default App;
  