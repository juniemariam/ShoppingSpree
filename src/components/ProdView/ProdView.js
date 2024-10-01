import React, { Component } from 'react'
import classes from './ProdView.module.css'
import { connect } from 'react-redux';

import ProdSingleView from './ProdSingleView/ProdSingleView'

class ProdView extends Component {
    
    render(){
        const query = new URLSearchParams(this.props.location.search)
        let queryLis = []
        for(let param of query.entries()){
            queryLis.push(param)  
        }
        return(
            <div className={classes.ProdView}>
                <ProdSingleView prodId={queryLis[0][0]} userId={this.props.userId}/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    };
};

export default connect( mapStateToProps )(ProdView);