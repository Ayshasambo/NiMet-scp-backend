import React, {useContext, useEffect, useState} from 'react'

import './topnav.css'

import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/authContext/AuthContext'
import { Button } from 'react-bootstrap'
import { logout } from "../../context/authContext/AuthActions";
import { useHistory } from "react-router";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Topnav = () => {
    // const { user } = useContext(AuthContext);
    // const decodedUser = jwtDecode(user);

    // const [selectedUser, setSelectedUser] = useState(null);    
    // const { dispatch } = useContext(AuthContext);
    // const history = useHistory();
    
    

    // useEffect(() => {
    //     const getUser = async () => {
    //       try {
    //       const res = await axios.get(`http://localhost:5000/api/user/find/${decodedUser?.id}`);
    //       setSelectedUser(res.data)
    //     }
    //      catch (err) {
    //       console.log(err);
    //     }

    //   };
    //   getUser();
    //   }, []);

    // const handleLogout = (e) => {
    //     e.preventDefault();
    //     dispatch(logout());
    //     history.push("/");
    // }
    
    return (
        <div className='topnav'>
            <div className="topnav__search">
            <h1 className="">NiMet Alert System</h1>
            </div>
            <div className="topnav__right">
                {/* <div className="topnav__right-item">
                    <h6 className="">
                    {selectedUser?.fullname} 
                    </h6>
                </div> */}
                <div className="topnav__right-item">
                </div>
                <Button 
                    variant="outline-danger"
                    //onClick={handleLogout}
                    >Logout</Button>
            </div>
        </div>
    )
}

export default Topnav
