import React, { useState, useEffect } from 'react'

import Auxil from '../../../hoc/Auxil/Auxil'
import FeedProd from '../feedProd/FeedProd'
import classes from './FeedSpecProd.module.css'
//import firebase from './node_modules/firebase'
import Spinner from '../../UI/Spinner/Spinner'
import Geo from '../../Map/Geo'
import GeoF from '../../Map/GeoF'
import firebase from 'firebase'
//import console = require('console');


const FeedSpecProd = (props) => {

    const [pComp,updComp]=useState((<Spinner/>))
    const [mapComp, upMap]=useState(<Spinner/>)
    const [locatArray, upLocat] = useState([{pos:{lat : 9.318226, lng : 76.613996},name:"Default"}])
    let mapCompo = <Spinner/>
    //let usrLoc = null
    const selArray = []
    const locArray = []


    const query = new URLSearchParams(props.location.search)
    let queryLis = []
    for(let param of query.entries()){
        queryLis.push(param)  
    }
    
    const compList = []

    const showSpecProd = (proDet) =>{
        console.log("clicked")
        console.log(proDet)
        const queryPar = encodeURIComponent(proDet);

        props.history.push({
        pathname: "/ProdView",
        search: "?" + queryPar
        });
    }

    useEffect(()=>{
        // navigator.geolocation.getCurrentPosition(position => {
        //     console.log(position)
        //     usrLoc={lat:position.coords.latitude, lng:position.coords.longitude}
        // })
        const db = firebase.firestore();
        const srchRef = db.collection("products");
        const srchRes = srchRef.where("tags", "array-contains", queryLis[0][0])
        srchRes.onSnapshot(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.data();
                    compList.push(childData)
                    // console.log(compList)
                });

                compList.map(selScrap => {
                    selArray.push(selScrap.sellerId)
                })

                selArray.map(locScrap => {
                    const locRef = db.collection("shop");
                    const locRes = locRef.where('userId','==',locScrap)
                    locRes.onSnapshot(sapshot => {
                            sapshot.forEach(function(chldSapshot) {
                                var chldData = chldSapshot.data();
                                locArray.push({pos: chldData.loc, name: chldData.name})
                                // console.log(locArray)
                            });
                            //console.log(selArray)
                            //console.log(locArray)
                            //upLocat(locArray)
                            upMap(<GeoF locArray={locArray}/>)
                        })
                    // locRes.onSnapshot(function(sapshot){
                    //     sapshot.forEach(function(chldSapshot) {
                    //         var chldData = chldSapshot.data();
                    //         locArray.push({pos: chldData.loc, name: chldData.name})
                    //     });
                    // })
                })
                
                // mapCompo=(<Geo locArray={locArray}/>)
                
                if(compList[0] == null){
                    updComp(<p>No results</p>)
                    upMap(null)
                }
                else{
                    updComp(compList.map(indProd => (
                        <div key={indProd.id} onClick={event => showSpecProd(indProd.id)}>
                            <FeedProd 
                                name={indProd.name}
                                content={indProd.content}
                                price={indProd.price}
                                imageSrc={indProd.imageSrc}
                                imgAlt={indProd.imgAlt}
                                isInStock={indProd.isInStock}
                                ratVal={indProd.ratingVals.ratingValue.toFixed(1)}
                                />
                        </div>
                    )))
                }
                
        })  
        
        // const rootRef = firebase.database().ref()
        // const srchRef = rootRef.child('Products').orderByChild('name').equalTo(queryLis[0][0])
            
        // srchRef.once('value', function(snapshot) {
        //         snapshot.forEach(function(childSnapshot) {
        //         var childKey = childSnapshot.key;
        //         var childData = childSnapshot.val();
        //         compList.push(childData)
        //         });
        //         updComp(compList.map(indProd => (
        //             <div key={indProd.id}>
        //             <FeedProd 
        //                 name={indProd.name}
        //                 content={indProd.content}
        //                 price={indProd.price}
        //                 imageSrc={indProd.imageSrc}
        //                 imgAlt={indProd.imgAlt}
        //                 />
        //             </div>
        //         )))
        // })  
    },[updComp, props.location.search])
    
    // useEffect(()=>{
    //     console.log("update")
    //     upMap(<Geo locArray={locArray}/>)
    // },[locatArray])
     
    return(
        <Auxil>
            <div className={classes.page}>
            
                {/* <Geo locArray={locArray}/> */}
                <div className={classes.mapDiv}>
                    {mapComp}
                </div>

                <div className={classes.FeedSpecProdList}>
                    {pComp}
                </div>
            </div>
        </Auxil>
    )
}

export default FeedSpecProd