import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import LoginIcon from '../../../assets/icons/login.png'
import home from '../../../assets/icons/home.png'
import wish from '../../../assets/icons/heart (1).png'
import plusIcon from '../../../assets/icons/plus.svg'
import analyticsIcon from '../../../assets/icons/analytics.svg'


const navigationItems = (props) =>{
    //const isCust = localStorage.getItem('isCust'); 
    const isCust = (localStorage.getItem('isCust')==="true");
    
    // let isShop = !isCust
    // if(props.isCust===true)

    //     isShop=false
    // else
    //     isShop=true

    // console.log(isCust)
    // console.log(!isCust)
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact clicked={props.clicked}>
                    <img src={home} className={classes.Home} alt= "alt" />Home
            </NavigationItem>
            {props.isAuthenticated && isCust ? <NavigationItem link="/wish" clicked={props.clicked}>
                <img src={wish} className={classes.WiSh} alt="alt" />Wishlist
            </NavigationItem> : null}
            {props.isAuthenticated && (!isCust) ? <NavigationItem link="/AddProd" clicked={props.clicked}>
                <img src={plusIcon} className={classes.WiSh} alt="alt" />Add Product
            </NavigationItem> : null}
            {props.isAuthenticated && (!isCust) ? <NavigationItem link="/ManProd" clicked={props.clicked}>
                <img src={analyticsIcon} className={classes.WiSh} alt="alt" />Manage Products
            </NavigationItem> : null}
            {!props.isAuthenticated
                ? <NavigationItem link="/auth" clicked={props.clicked}>
                    <img src={LoginIcon} className={classes.WiSh} alt="alt" />Login</NavigationItem>
                : <NavigationItem link="/logout" clicked={props.clicked}>
                    <img src={LoginIcon} className={classes.WiSh} alt="alt" />Logout</NavigationItem>}
        </ul>
    )
}
    


export default navigationItems