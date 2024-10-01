import React, { useState, useEffect } from 'react'

import Auxil from '../../hoc/Auxil/Auxil'
import FeedProd from './feedProd/FeedProd'
import classes from './FeedProdList.module.css'
import firebase from 'firebase'
import Spinner from '../UI/Spinner/Spinner'
import { withRouter } from "react-router";

const FeedProdList = (props) => {
    let fetchedProd = []
    const [prodList, prodUpdt] = useState(fetchedProd)
    const [pComp,updComp]=useState((<Spinner/>))

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

        const db = firebase.firestore();
        const srchRef = db.collection("products");

        srchRef.onSnapshot(function(snapshot) {
            fetchedProd = []
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.data();
                fetchedProd.push(childData)
            });
            prodUpdt(fetchedProd)
            if(fetchedProd[0] == null){
                updComp(<p>No Products</p>)
            }
            else{
                updComp(fetchedProd.map(indProd => (
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

        // firebase.database().ref('Products/').once('value').then(
        //     function(snapshot) {
        //         const v=snapshot.val()
    
        //         for(let indProd in v){
        //             fetchedProd.push({
        //                 ...v[indProd],
        //                 id: indProd
        //             })
        //         }
        //         prodUpdt(fetchedProd)
        //         updComp(prodList.map(indProd => (
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
        //     }
        // )     
    },[])

    return(
        <Auxil>
            <div className={classes.FeedProdList}>
                {pComp}
            </div>
        </Auxil>
    )
}

export default withRouter(FeedProdList);