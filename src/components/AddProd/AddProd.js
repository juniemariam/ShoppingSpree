import React, { Component } from 'react';

import firebase from 'firebase'
import { withRouter } from "react-router";

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import classes from './AddProd.module.css'

class AddProd extends Component {

    state = {
        prodDet:{
            ProdName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false
            },
            ProdPrice: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Price'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false
            },
            ProdCategory: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'electronics', displayValue:'Electronics'},
                        {value: 'fashion', displayValue:'Fashion'},
                        {value: 'grocery', displayValue:'Grocery'},
                        {value: 'household', displayValue:'Household'},
                        {value: 'other', displayValue:'Other'}
                    ]
                },
                value: 'electronics',
                validation: {},
                valid: true
            },
            BrandName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Brand'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false
            },
            ProdContent: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            ProdImageLink: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Image Link'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false
            },
            ProdTags: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tags (seperate using , )'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false
            }   
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.prodDet,
            [controlName]: {
                ...this.state.prodDet[controlName],
                value: event.target.value,
                touched: true
            }
        };
        this.setState( { prodDet: updatedControls } );
    }


    submitHandler = ( event ) => {
        event.preventDefault();
        const db = firebase.firestore();
        const usId = localStorage.getItem('userId');

        let proTag = this.state.prodDet.ProdTags.value
        proTag.trim()
        const proTagArray = proTag.split(',')

        const dataNew = {
            name: this.state.prodDet.ProdName.value,
            brand: this.state.prodDet.BrandName.value,
            price:  this.state.prodDet.ProdPrice.value,
            category:  this.state.prodDet.ProdCategory.value,
            content:  this.state.prodDet.ProdContent.value,
            imageSrc: this.state.prodDet.ProdImageLink.value,
            imgAlt: "Image",
            tags: proTagArray,
            sellerId: usId,
            ratingVals: {
                noOfRating: 0,
                ratingValue: 0
            },
            custRatings: [],
            views: 0
        }

        db.collection("products").add(dataNew)
        .then(function(docRef) {
            db.collection("products").doc(docRef.id).update({id:docRef.id});
        })

        this.props.history.push({
            pathname: "/",
        });
    }

    render() {
        const formElementsArray = [];

        for ( let key in this.state.prodDet ) {
            formElementsArray.push( {
                id: key,
                config: this.state.prodDet[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id, this.state.controls )} />
        ) );


        return(
            <div className={classes.AddProd}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button className={classes.Submit} btnType="Success">SUBMIT</Button>
                </form>
            </div>
        )
    }
}




const mapStateToProps = state => {
    return {
        //loading: state.auth.loading,
        //error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.burgerBuilder.building,
        //authRedirectPath: state.auth.authRedirectPath
    };
};

export default withRouter(connect( mapStateToProps )( AddProd ));