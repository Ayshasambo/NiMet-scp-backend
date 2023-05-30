import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'

import './sidebar.css'

import nimetlogo1 from '../../assets/images/nimet-logo.png'

import { publicRequest } from '../../requestMethods'


const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {

    
    const history = useHistory();
    

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={nimetlogo1} alt=" logo" />
            </div>
                    <Link to="/">
                        <SidebarItem
                            title="Dashboard"
                            icon="bx bx-category-alt"
                        />
                    </Link>
                    <Link to="/alerts">
                        <SidebarItem
                            title="Alerts"
                            icon="bx bx-file"
                        />
                    </Link>
                    <Link to="/impactbaseds">
                        <SidebarItem
                            title="Impact Based Forecasts"
                            icon="bx bx-file"
                        />
                    </Link>
        </div>
    )
}

export default Sidebar
