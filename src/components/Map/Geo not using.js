import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Layout from "../../hoc/Layout/Layout";

const cords = [9.9312, 76.2673 | 9.8745, 76.3704];



const mapStyles = [
  {
    strictBounds: "cords",
    width: "100%",
    height: "100%",
    cursor: "default",
    draggableCursor: "none",
    draggingCursor: "none"
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        saturation: "-70"
      },
      {
        lightness: "14"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.medical",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.sports_complex",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.station.bus",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "transit.station.bus",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        saturation: "100"
      },
      {
        lightness: "-14"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      },
      {
        lightness: "12"
      }
    ]
  }
];

export class Geo extends Component {
  constructor() {
    super();
    this.state = {
      announcements: [],
      loading: true,
      showingInfoWindow: false,
      activeMarker: {},
      activePolyline: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, Polyline, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        activePolyline: null
      });
    }
  };
  render() {
    return (
      <Layout>
        <Map
          mapfitBounds={cords}
          google={this.props.google}
          onClick={this.onMapClicked}
          minZoom={5}
          maxZoom={15}
          styles={mapStyles}
          zoomControl={true}
          disableDoubleClickZoom={true}
          cursorType={"pointer"}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          initialCenter={{
            lat: 26.860061,
            lng: 75.668506
          }}
        >
          <InfoWindow
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </Layout>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ""
})(Geo);
