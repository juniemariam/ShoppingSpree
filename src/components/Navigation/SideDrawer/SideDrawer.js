import React from 'react'
import classes from './SideDrawer.module.css'
//import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Auxil/Auxil'
import Backdrop from '../../UI/Backdrop/Backdrop'

  
const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
        //console.log({attachedClasses})
    }
    //console.log(props.open)
    //console.log(attachedClasses)
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            
            <div className={attachedClasses.join(' ')}>
                {/* <div className={classes.Logo}>
                    <Logo />
                </div> */}
                <nav>
                    <h1 className={classes.headText}>ShoppingSpree</h1>
                    <NavigationItems 
                        clicked={props.closed} 
                        isAuthenticated={props.isAuth} 
                        isCust={props.isCust}/>
                   
                </nav>
            </div>
        </Aux>
        
    )

}

export default sideDrawer;
