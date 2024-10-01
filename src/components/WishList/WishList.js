import React, { useState, useEffect, Component } from 'react'
import { connect } from 'react-redux';

import Auxil from '../../hoc/Auxil/Auxil'
import classes from './WishList.module.css'
// import FeedProd from '../feedProdList/feedProd/FeedProd'
// //import firebase from './node_modules/firebase'
// import Spinner from '../UI/Spinner/Spinner'
// import firebase from 'firebase'
import WishL from './WishL/WishL'

class WishList extends Component {
    render(){
        return(
            <Auxil>
                <div className={classes.WishList}>
                    <WishL userId={this.props.userId}/>
                </div>
            </Auxil>
        )
    }  
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    };
};
export default connect( mapStateToProps )(WishList);