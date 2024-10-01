import axios from 'axios';
import firebase from 'firebase'
import Push from 'push.js'

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup, isCust, userData) => {
    return dispatch => {
        dispatch(authStart());
        // console.log(email)
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // console.log(isSignup)
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAu0pReHYzKAKWwFuepIHf8_1xwbBvweuM';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAu0pReHYzKAKWwFuepIHf8_1xwbBvweuM';
        }
        axios.post(url, authData)
            .then(response => {
                const db = firebase.firestore();
                if(!isSignup){
                    let usId = response.data.localId
                    if(isCust){
                        db.collection("customer").doc(usId).get()
                            .then(snapshot => {
                                let veriDat = snapshot.data()
                                console.log(veriDat)
                                if(veriDat == null)
                                    dispatch(logout())
                            })
                    }else{
                        db.collection("shop").doc(usId).get()
                            .then(snapshot => {
                                let veriDat = snapshot.data()
                                console.log(veriDat)
                                if(veriDat == null)
                                    dispatch(logout())
                        })
                    }
                }
                let dataNew = {}
                
                if(isSignup){
                    
                    let setDoc = null
                    if(isCust){
                        setDoc = db.collection("customer");
                        dataNew = {
                            name: userData.name.value,
                            email: userData.email.value,
                            pinCode: userData.pinCode.value,
                            userId: response.data.localId,
                            wish:[],
                            isCust: 1
                        }
                    }  
                    else{
                        setDoc = db.collection("shop");
                        dataNew = {
                            name: userData.name.value,
                            email: userData.email.value,
                            pinCode: userData.pinCode.value,
                            loc: {
                                lat: userData.lat.value,
                                lng: userData.lng.value
                            },
                            userId: response.data.localId,
                            phone: userData.phoneNo.value,
                            custRatings:[],
                            ratingVals:{
                                noOfRating: 0,
                                ratingValue: 0
                            },
                            isCust: 0
                        }
                    }     
                    setDoc.doc(response.data.localId).set(dataNew)
                    if (Notification.permission == 'granted') {
                        navigator.serviceWorker.getRegistration().then(function(reg) {
                          reg.showNotification('Welcome to ShoppingSpree!!');
                        });
                    }
                }
                
                // console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('isCust', isCust);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                if (Notification.permission === 'granted') {
                    let options = {
                        body: "Check out our awesome products"
                    }
                    new Notification('Welcome to ShoppingSpree!',options)
                    // navigator.serviceWorker.getRegistration().then(function(reg) {
                    //   reg.showNotification('Welcome to ShoppingSpree!');
                    // });
                }
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    console.log("called")
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};