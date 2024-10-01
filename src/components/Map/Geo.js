import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Directionbutton from "../../components/UI/Button/Button";
import Auxil from "../../hoc/Auxil/Auxil";
import Layout from "../../hoc/Layout/Layout";
import CurrentLocation from "./Map";
import classes from "./Geo.module.css";
//import MapViewDirections from "react-native-maps-directions";

export class Geo extends Component {
  state = {
    streetViewControl: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    usrLat : 9.318226,
    usrLng : 76.613996,
    mapComp: null,
    mrkrs: null
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps.locArray)
    console.log(this.props.locArray)
    if (this.props.locArray !== prevProps.locArray) {
        this.updateMap();
    }
  }

  updateMap(){
    const mapCompo = (<Map google={this.props.google}
      style={{width: '60%', height: '60%', position: 'relative'}}
      className={'map'}
      zoom={14}
      initialCenter={{
        lat: this.state.usrLat,
        lng: this.state.usrLng
      }}>
      {this.state.mrkrs}
      <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
      </InfoWindow>
    </Map>)
    this.setState({mapComp: mapCompo})
  }
  
  componentWillMount(){
      // navigator.geolocation.getCurrentPosition(position => {
      //   console.log(position)
      //   this.setState({usrLat: position.coords.latitude, usrLng: position.coords.longitude})
      // })
      const locArray = this.props.locArray
      // const locArray =  newProps.locArray
      console.log(locArray)
      const mrkrs = (locArray.map(locat => (
        <Marker onClick={this.onMarkerClick} name={locat.name}  position={locat.pos}/>
      )))
      this.setState({mrkrs: mrkrs})
      this.updateMap();  
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
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
            {this.state.mapComp}
      </Auxil>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBSS-C2AaaEAxXFJXGvwb7xL9MFcjuButE"
})(Geo);
