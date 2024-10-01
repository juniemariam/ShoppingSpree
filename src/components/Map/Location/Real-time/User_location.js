import React, { Component } from "react";
import { error } from "util";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    })
  }
  //   this.watchId = navigator.geolocation.watchPosition(
  //     position =>  {
  //       console.log(position.coords.latitude)
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude
  //       });
  //     },
  //     error => {
  //       this.setState({ error: error.message });
  //     },
  //     { enableHighAccuracy: true, timeout: 1, maximumAge: 1, distanceFilter: 1 }
  //   );
  // }
  render() {
    const perm = navigator.permissions.query({name: 'geolocation'})
    console.log(perm)
    
    //console.log(this.state.latitude)
    return (
      <div className="Location">
        <header className="Location">
          {this.state.latitude && this.state.longitude ? (
            <text>
              Mylocation is:{this.state.latitude},{this.state.longitude}
            </text>
          ) : (
            <text>i dont know where u are</text>
            
          )}
          
        </header>
      </div>
    );
  }
}

export default Location;
