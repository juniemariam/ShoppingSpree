import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxil from '../../hoc/Auxil/Auxil'
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { FormControl } from '@material-ui/core';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password (Min 6 char)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        signupCustContr: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full Name'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'PIN Code (Min. 6 char)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password (Min. 6 char)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        signupShopContr:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Seller Name'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            lat: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Latitude'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            lng: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Longitude'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'PIN Code (Min. 6 char)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            phoneNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone No.'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password (Min. 6 char)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false,
        isCust: true,
        radVal: 'customer'
        
    }

    componentDidMount() {
        // if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
        //     this.props.onSetAuthRedirectPath();
        // }
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName, contr ) => {
        const updatedControls = {
            ...contr,
            [controlName]: {
                ...contr[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, contr[controlName].validation ),
                touched: true
            }
        };
        if(!this.state.isSignup)
            this.setState( { controls: updatedControls } );
        else{
            if(this.state.isCust)
                this.setState( { signupCustContr: updatedControls } ); 
            else    
                this.setState( { signupShopContr: updatedControls } );
        }
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        let usrData = this.state.controls
        //let userData = {}
        if(this.state.isSignup){
            if(this.state.isCust)
                usrData=this.state.signupCustContr
            else
                usrData=this.state.signupShopContr 
        }
            
        console.log(usrData)
        //console.log(userData)
        //this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup, this.state.isCust, userData );
        this.props.onAuth( usrData.email.value, usrData.password.value, this.state.isSignup, this.state.isCust, usrData );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    switchSignUpHandler = (event, value) => {
        this.setState(prevState => {
            return {isCust: !prevState.isCust, radVal: value};
        });
    }

    render () {
        const formElementsArray = [];
        let usedContr = []
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }



        let form = formElementsArray.map( formElement => (
            // <OutlinedInput
            //     key={formElement.id}
            //     className={classes.Inp}
            //     type={formElement.config.elementType}
            //     labelWidth={0}
            //     value={formElement.config.value}
            //     placeholder={formElement.config.elementConfig.placeholder}
            //     onChange={( event ) => this.inputChangedHandler( event, formElement.id, this.state.controls )}/>
            <Input className={classes.Autho}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id, this.state.controls )} />
        ) );

        let optio = (
            <Auxil>
                <FormControl>
                    <RadioGroup
                        aria-label="Type"
                        name="account_type"
                        value={this.state.radVal}
                        onChange={(event, value) => this.switchSignUpHandler(event, value)}>
                            <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                            <FormControlLabel value="shop" control={<Radio />} label="Shop" />
                    </RadioGroup>
                </FormControl>
            </Auxil>
        )

        if(this.state.isSignup){
            if(this.state.isCust){
                usedContr = this.state.signupCustContr
            }else{
                usedContr = this.state.signupShopContr
            }
            
            const frmElementsArray = [];
            for ( let key in usedContr) {
                frmElementsArray.push( {
                    id: key,
                    config: usedContr[key]
                } );
            }
            
            form = frmElementsArray.map( formElement => (
                    // <OutlinedInput
                    // key={formElement.id}
                    // className={classes.Inp}
                    // type={formElement.config.elementType}
                    // labelWidth={0}
                    // value={formElement.config.value}
                    // placeholder={formElement.config.elementConfig.placeholder}
                    // onChange={( event ) => this.inputChangedHandler( event, formElement.id, usedContr )}/>
                <Input className={classes.Autho}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => this.inputChangedHandler( event, formElement.id, usedContr )} />
            ) );
        }

        

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>INVALID</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {optio}
                    {form}
                    <Button className={classes.Submit} btnType="Success">SUBMIT</Button>
                </form>
                <Button className={classes.Switch}
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup, isCust, userData ) => dispatch( actions.auth( email, password, isSignup, isCust, userData ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );






















// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

// import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import classes from './Auth.module.css';
// import * as actions from '../../store/actions/index';

// class Auth extends Component {
//     state = {
//         controls: {
//             email: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'email',
//                     placeholder: 'Mail Address'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     isEmail: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             password: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'password',
//                     placeholder: 'Password'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     minLength: 6
//                 },
//                 valid: false,
//                 touched: false
//             }
//         },
//         isSignup: true
//     }

//     componentDidMount() {
//         // if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
//         //     this.props.onSetAuthRedirectPath();
//         // }
//         if (this.props.authRedirectPath !== '/') {
//             this.props.onSetAuthRedirectPath();
//         }
//     }

//     checkValidity ( value, rules ) {
//         let isValid = true;
//         if ( !rules ) {
//             return true;
//         }

//         if ( rules.required ) {
//             isValid = value.trim() !== '' && isValid;
//         }

//         if ( rules.minLength ) {
//             isValid = value.length >= rules.minLength && isValid
//         }

//         if ( rules.maxLength ) {
//             isValid = value.length <= rules.maxLength && isValid
//         }

//         if ( rules.isEmail ) {
//             const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//             isValid = pattern.test( value ) && isValid
//         }

//         if ( rules.isNumeric ) {
//             const pattern = /^\d+$/;
//             isValid = pattern.test( value ) && isValid
//         }

//         return isValid;
//     }

//     inputChangedHandler = ( event, controlName ) => {
//         const updatedControls = {
//             ...this.state.controls,
//             [controlName]: {
//                 ...this.state.controls[controlName],
//                 value: event.target.value,
//                 valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
//                 touched: true
//             }
//         };
//         this.setState( { controls: updatedControls } );
//     }

//     submitHandler = ( event ) => {
//         event.preventDefault();
//         this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
//     }

//     switchAuthModeHandler = () => {
//         this.setState(prevState => {
//             return {isSignup: !prevState.isSignup};
//         });
//     }

//     render () {
//         const formElementsArray = [];
//         for ( let key in this.state.controls ) {
//             formElementsArray.push( {
//                 id: key,
//                 config: this.state.controls[key]
//             } );
//         }

//         let form = formElementsArray.map( formElement => (
//             <Input
//                 className={classes.Input}
//                 key={formElement.id}
//                 elementType={formElement.config.elementType}
//                 elementConfig={formElement.config.elementConfig}
//                 value={formElement.config.value}
//                 invalid={!formElement.config.valid}
//                 shouldValidate={formElement.config.validation}
//                 touched={formElement.config.touched}
//                 changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
//         ) );

//         if (this.props.loading) {
//             form = <Spinner />
//         }

//         let errorMessage = null;

//         if (this.props.error) {
//             errorMessage = (
//                 <p>{this.props.error.message}</p>
//             );
//         }

//         let authRedirect = null;
//         if (this.props.isAuthenticated) {
//             authRedirect = <Redirect to={this.props.authRedirectPath}/>
//         }

//         return (
//             <div className={classes.Auth}>
//                 {authRedirect}
//                 {errorMessage}
//                 <form onSubmit={this.submitHandler}>
//                     {form}
//                     <Button btnType="Success">SUBMIT</Button>
//                 </form>
//                 <Button 
//                     clicked={this.switchAuthModeHandler}
//                     btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error,
//         isAuthenticated: state.auth.token !== null,
//         authRedirectPath: state.auth.authRedirectPath
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
//         onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
//     };
// };

// export default connect( mapStateToProps, mapDispatchToProps )( Auth );