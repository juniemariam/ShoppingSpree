import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router";
import classes from './ProdSingleView.module.scss'
import firebase from 'firebase'
import StarRatings from 'react-star-ratings';
import Spinner from '../../UI/Spinner/Spinner'
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import phone from '../../../assets/icons/phone.svg'
import heartIcon from '../../../assets/icons/heart.svg'
import mapIcon from '../../../assets/icons/mapIcon.svg'
//import console = require('console');

const ProdSingleView = (props) => {
    const [usrId, updId] = useState(props.userId)
    const [proDat, upDat] = useState(null)
    const [ratVal, upRatVal] = useState(0)
    // const [ratBoot, upRatBoot] = useState(0)
    let usrLat = 9.318226
    let usrLng = 76.613996
    let oldWishList = null
    let viewCount = 0
    const [prodComp, updProd] = useState(<Spinner />)
    const [contInfo, updCont] = useState(<Spinner />)

    const db = firebase.firestore();

    let rating = null 
    let rat = null
    let starVal = 0

    const changeRating = (event) =>{
        //console.log(event)
        starVal = event
        // upRatVal(event)
        // console.log(ratVal)
        //console.log(starVal)
    }

    const ratSubmit = (event) => {
        console.log("clicked")
        const ratMain = db.collection('products')
        const ratSet = db.collection('products').doc(props.prodId)
        // upRatBoot(ratBoot+1)
        // console.log(ratBoot)
            const ratRef = db.collection('products').doc(props.prodId).get()
            .then(snpshot => {
                const snapshot = snpshot.data()
                snapshot.custRatings.push(props.userId)
                let ratVals = ((((snapshot.ratingVals.noOfRating)*(snapshot.ratingVals.ratingValue)) + starVal)/(snapshot.ratingVals.noOfRating + 1))
                const setRat = ratSet.update({
                    custRatings : snapshot.custRatings,
                    ratingVals : {
                        noOfRating : (snapshot.ratingVals.noOfRating + 1),
                        ratingValue : ratVals
                    }
                })
                
                // const queryPar = encodeURIComponent(props.prodId);
                // console.log(props.prodId)
                window.location.reload();
                // console.log("pushing part")
                // props.history.push({
                // pathname: "/ProdView",
                // search: "?" + queryPar
                // });
            })
        //}
    }

    const addWishList = () => {
        let fullDat = null
        let boot = 0;
        if(props.userId!==null){
            const addWish = db.collection("customer")
            const addWshRef = db.collection("customer").doc(props.userId).get()
            .then(snapshot => {
                fullDat = snapshot.data()
                const oldWishList = fullDat.wish
                oldWishList.map(wishIt => {
                    if (wishIt === props.prodId){
                        boot = 1
                    }
                })
                if(!boot){
                    oldWishList.push(props.prodId)
                    addWish.doc(props.userId).update({
                        wish: oldWishList
                    })
                }
            })
        }
    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            usrLat = (position.coords.latitude)
            usrLng = (position.coords.longitude)
        })
        const perm = navigator.permissions.query({name: 'geolocation'})
        console.log(perm)
        const ratSrch = db.collection("products")
        const srchRef = db.collection("products").doc(props.prodId).get()
        .then(snapshot => {
            const proData = snapshot.data()
            viewCount = proData.views + 1
            db.collection("products").doc(props.prodId).update({views:viewCount});
            upDat(proData)
            if(props.userId){
                // rat = ratSrch.where("id","==",props.prodId).where("custRatings", "array-contains", props.userId)
                // rat.onSnapshot(snsh => {
                //         const ratsnp = snsh.data()
                //         console.log(ratsnp)
                //     }) 

                const bootChk = proData.custRatings.includes(props.userId)

                if(!bootChk){
                    rating=(
                            <div>
                                <p>Rate this Product :</p>
                                <StarRatings
                                rating={ratVal}
                                starRatedColor="blue"
                                changeRating={event => changeRating(event)}
                                numberOfStars={5}
                                name='ProdRating'
                                starDimension="20px"
                                starSpacing="7px"/>
                                <Button onClick={event => ratSubmit(event)}>Submit</Button>
                            </div>)
                }else{
                    rating = null
                }
                     
            }
            console.log(proData.isInStock)
            updProd(<div className={classes.ProdSingleView}>
                        <img src={proData.imageSrc} alt={proData.imgAlt} className={classes.img}/>
                        <div className={classes.content}>
                            <h2><strong>{proData.brand}{" "}{proData.name}</strong></h2>
                            <p>Rating: {(proData.ratingVals.ratingValue).toFixed(1)}</p>
                            <p className={classes.cont}><i>{proData.content}</i></p>
                            <p><strong>{proData.price}</strong></p>
                            <p>{proData.isInStock===0? "Out of stock": "In stock"}</p>
                        </div>
                        {rating}

                    </div>)
            const shopRef = db.collection("shop").doc(proData.sellerId).get()
                .then(snapshot => {
                    const shopData = snapshot.data()
                    const sellerName = snapshot.data().name
                    const telPhone = "tel:"+shopData.phone
                    
                    const srchParam = {
                        origin: usrLat+","+usrLng,
                        destination: shopData.loc.lat+","+shopData.loc.lng
                    }

                    const url = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBSS-C2AaaEAxXFJXGvwb7xL9MFcjuButE&origin="+srchParam.origin+"&destination="+srchParam.destination
                    console.log(usrLat)
                    
                    updCont(
                        <div className={classes.page}>
                            <p>Seller : <strong>{sellerName}</strong></p>
                            <div className={classes.navIcons}>
                            <div className={classes.wish}>
                                <Fab variant="extended" aria-label="Delete" className={classes.fab} >
                                    <img src={heartIcon} alt="phoneIcon" className={classes.phoneIcon} onClick={addWishList}/>
                                </Fab>
                                </div>
                                <div className={classes.wish}>
                                <a href={telPhone}>
                                <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                                        <img src={phone} alt="phoneIcon" className={classes.phoneIcon}/>
                                    </Fab>     
                                </a>
                                </div>
                                
                                <div className={classes.wish}>
                                <a href = {url} target="_blank" >
                              
                                    <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                                        <img src={mapIcon} alt="phoneIcon" className={classes.phoneIcon}/>
                                    </Fab>
                                    
                                </a>
                               </div>
                            </div>
                        </div>
                    )
                })
        })
        
    },[])


    return(
        <div>
            {prodComp}
            {contInfo}
        </div> 
    )
}
    


export default withRouter(ProdSingleView)