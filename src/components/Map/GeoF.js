import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Directionbutton from "../../components/UI/Button/Button";
import Auxil from "../../hoc/Auxil/Auxil";
import homeIcon from '../../assets/icons/homeLoc3.png'
import Layout from "../../hoc/Layout/Layout";
import CurrentLocation from "./Map";
import classes from "./Geo.module.css";
//import MapViewDirections from "react-native-maps-directions";

const GeoF = (props) => {

  const [streetViewControl, upStrtView] = useState(false)
  const [showingInfoWindow, upShowInfo] = useState(false)
  const [activeMarker, upActivM] = useState({})
  const [selectedPlace, upSelectP] = useState({})
  const [usrLoc, upUsrLoc] = useState({usrLat : 9.318226,usrLng : 76.613996})
  const [mapComp, upMap] = useState(<div className={classes.mapPlace}>
                                      <p>Please Turn on Geolocation Services</p>
                                      <p> to enable LIVE MAP</p>
                                    </div>)
  let usL = {usrLat : 9.318226,usrLng : 76.613996}
//   const [mrkrs, upMrkrs] = useState(null)

//   componentDidUpdate(prevProps) {
//     console.log(prevProps.locArray)
//     console.log(this.props.locArray)
//     if (this.props.locArray !== prevProps.locArray) {
//         this.updateMap();
//     }
//   }

//   updateMap = () => {
//     const mapCompo = (<Map google={props.google}
//       style={{width: '60%', height: '60%', position: 'relative'}}
//       className={'map'}
//       zoom={14}
//       initialCenter={{
//         lat: usrLat,
//         lng: usrLng
//       }}>
//       {this.state.mrkrs}
//       <InfoWindow
//           marker={activeMarker}
//           visible={showingInfoWindow}
//           onClose={onClose}>
//           <div>
//             <h4>{this.state.selectedPlace.name}</h4>
//           </div>
//       </InfoWindow>
//     </Map>)
//     upMap(mapCompo)
//   }

    const onMarkerClick = (props, marker, e) => {
        console.log(props)
        console.log(marker)
        upSelectP(props)
        upActivM(marker)
        upShowInfo(true)
    }

    const onClose = props => {
        if (showingInfoWindow) {
            upShowInfo(false)
            upActivM(null)
        }
    };

  // useEffect(()=>{
    
  // },[])  

  useEffect(()=>{
      // navigator.geolocation.getCurrentPosition(position => {
      //   //console.log(position)
      //   upUsrLoc({usrLat: position.coords.latitude, usrLng: position.coords.longitude})
      // })
      navigator.geolocation.getCurrentPosition(position => {
        usL = {usrLat: position.coords.latitude, usrLng: position.coords.longitude}
        const locArray = props.locArray
      const mrkrs = (locArray.map(locat => (
        <Marker onClick={onMarkerClick} name={locat.name}  position={locat.pos}/>
      )))
      const mapCompo = (<Map google={props.google}
         style={{width: '80%', height: '60%', position: 'relative', margin:'10px auto'}}
        className={'map'}
        zoom={14}
        initialCenter={{
          lat: usL.usrLat,
          lng: usL.usrLng
        }}>
        <Marker 
          onClick={onMarkerClick} name={"You are here"}  
          position={{lat:usL.usrLat, lng:usL.usrLng}}
          icon={{
            url: homeIcon
          }} />
        {mrkrs}
        <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={onClose}>
            <div>
              <h4>{selectedPlace.name}</h4>
            </div>
        </InfoWindow>
      </Map>)
      upMap(mapCompo)
      })
      
  },[props, activeMarker])
  


    // const locArray = this.props.locArray
    // console.log(locArray)
    // const mrkrs = (locArray.map(locat => (
    //   <Marker onClick={this.onMarkerClick} name={locat.name}  position={locat.pos}/>
    // )))
    return (
      <Auxil className={classes.Geo}>
          {/* <Map google={this.props.google}
              style={{width: '60%', height: '60%', position: 'relative'}}
              className={'map'}
              zoom={14}
              initialCenter={{
                lat: this.state.usrLat,
                lng: this.state.usrLng
              }}>
              {mrkrs}
              <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}>
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
              </InfoWindow>
            </Map> */}
            {mapComp}
      </Auxil>
    );
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyBSS-C2AaaEAxXFJXGvwb7xL9MFcjuButE"
})(GeoF);
