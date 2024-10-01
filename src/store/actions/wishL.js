import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


// export const fetchWishSuccess = ( wishL ) => {
//     return {
//         type: actionTypes.WISHL_SUCCESS,
//         orders: wishL
//     };
// };

// export const fetchWishFail = ( error ) => {
//     return {
//         type: actionTypes.WISHL_FAIL,
//         error: error
//     };
// };

// export const fetchWishStart = () => {
//     return {
//         type: actionTypes.WISHL_START
//     };
// };

export const fetchWishL = (token, userId) => {
    return dispatch => {
        //dispatch(fetchWishStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                //dispatch(fetchWishSuccess(fetchedOrders));
            } )
            .catch( err => {
                console.log(err)
                //dispatch(fetchWishFail(err));
            } );
    };
};