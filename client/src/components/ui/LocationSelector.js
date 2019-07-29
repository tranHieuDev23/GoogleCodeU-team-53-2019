import React from 'react';
import poweredByGoogle from 'assets/powered_by_google_on_white_hdpi.png';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_MAPS_API_KEY } from '../../constants/apiKey';
import {
  getCurrentLocation,
  getPlaceId,
  getPlaceName
} from '../../helpers/LocationHelper';
import { addSearchBox } from './PlaceSearchBox';

class LocationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: null,
      selectedLocationName: null
    };
  }

  setToCurrentLocation() {
    getCurrentLocation()
      .then(result => {
        const location = {
          lat: result.coords.latitude,
          lng: result.coords.longitude
        };
        const google = this.props.google;
        getPlaceId(google, location)
          .then(placeId => {
            getPlaceName(google, placeId)
              .then(name => {
                this.setState({
                  selectedLocation: {
                    placeId: placeId,
                    lat: location.lat,
                    lng: location.lng
                  },
                  selectedLocationName: name
                });
                if (this.props.onLocationSelected)
                  this.props.onLocationSelected(this.state.selectedLocation);
              })
              .catch(reason => {
                console.log(reason);
              });
          })
          .catch(reason => {
            console.log(reason);
          });
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  mapReady(mapProps, map) {
    const {google} = mapProps;
    addSearchBox(google, map, (place) => {
      this.setState({
        selectedLocation: {
          placeId: place.place_id,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        selectedLocationName: place.formatted_address
      });
      if (this.props.onLocationSelected)
        this.props.onLocationSelected(this.state.selectedLocation);
    });
  }

  mapClicked(mapProps, map, clickEvent) {
    const { google } = mapProps;
    const { latLng } = clickEvent;
    getPlaceId(google, latLng)
      .then(placeId => {
        getPlaceName(google, placeId)
          .then(name => {
            this.setState({
              selectedLocation: {
                placeId: placeId,
                lat: latLng.lat(),
                lng: latLng.lng()
              },
              selectedLocationName: name
            });
            if (this.props.onLocationSelected)
              this.props.onLocationSelected(this.state.selectedLocation);
          })
          .catch(reason => {
            console.log(reason);
          });
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  render() {
    const style = {
      maxWidth: '100%',
      width: '800px',
      height: '450px',
      display: 'block'
    };
    return (
      <div>
        <div className='py-3'>
          <button type='button' onClick={this.setToCurrentLocation.bind(this)}>
            Set to current location
          </button>
        </div>
        <div style={style}>
          <Map
            google={this.props.google}
            zoom={14}
            center={this.state.selectedLocation}
            style={style}
            onReady={this.mapReady.bind(this)}
            onClick={this.mapClicked.bind(this)}>
            {this.state.selectedLocation == null ? null : (
              <Marker
                title={this.state.selectedLocationName}
                position={this.state.selectedLocation}
              />
            )}
          </Map>
        </div>
        {this.state.selectedLocation == null ? null : (
          <div>
            <p>Selected location: {this.state.selectedLocationName}</p>
            <img
              alt={'Powered by Google'}
              src={poweredByGoogle}
              style={{
                height: '1.2rem',
                width: 'auto'
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(LocationSelector);
