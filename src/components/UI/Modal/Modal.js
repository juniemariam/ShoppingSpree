import React from 'react';

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/Auxil/Aux'


const modal = (props) => (  
    <Aux>
        <Backdrop clicked={props.clicked} show={props.show}/>
        <div className={classes.Modal}
        style ={{
            transform: props.show ? 'translateY(0)':'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
        
        
        </div>
    </Aux>
    
);

export default modal;