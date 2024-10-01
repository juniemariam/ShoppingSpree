import React from 'react'

import classes from './Toolbar.module.scss'
//import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import SearchMain from '../SearchMain/SearchMain'
// import icon from './icon.png'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked = {props.drawerToggleClicked} />
        {/* <div className={classes.Logo}>
            <Logo />
        </div> */}
        <SearchMain/>
        {/* <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav> */}
    </header>
);

export default toolbar;