import React from 'react'
import classes from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom'

const navigationItem = ( props ) => (
    <li className = {classes.NavigationItem}
        onClick = {props.clicked}>
        <NavLink  
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
            {/* <img src='../home-button.png' />
            <img src='../heart(1).png' /> */}
    </li>
)

export default navigationItem;