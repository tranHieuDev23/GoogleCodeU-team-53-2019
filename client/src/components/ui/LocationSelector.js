import React from 'react';
import poweredByGoogle from 'assets/powered_by_google_on_white_hdpi.png'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Marker } from 'google-maps-react/dist/components/Marker';

class LocationSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: null,
            selectedLocationName: null,
        };
    }

    setToCurrentLocation() {
        console.log("setToCurrentLocation called!");
        getCurrentLocation().then((result) => {
            const location = {
                lat: result.coords.latitude,
                lng: result.coords.longitude
            };
            const google = this.props.google;
            getPlaceId(google, location).then((placeId) => {
                getPlaceName(google, placeId).then((name) => {
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
                }).catch((reason) => {
                    console.log(reason);
                });
            }).catch((reason) => {
                console.log(reason);
            });
        }).catch((reason) => {
            console.log(reason);
        });
    }

    mapClicked(mapProps, map, clickEvent) {
        const { google } = mapProps;
        const { latLng } = clickEvent;
        getPlaceId(google, latLng).then((placeId) => {
            getPlaceName(google, placeId).then((name) => {
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
            }).catch((reason) => {
                console.log(reason);
            });
        }).catch((reason) => {
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
                <div className="py-3">
                    <button type="button" onClick={this.setToCurrentLocation.bind(this)}>Set to current location</button>
                </div>
                <div style={style}>
                    <Map
                        google={this.props.google}
                        zoom={14}
                        center={this.state.selectedLocation}
                        style={style}
                        onClick={this.mapClicked.bind(this)}>
                        {
                            (this.state.selectedLocation == null ? null :
                                <Marker
                                    title={this.state.selectedLocationName}
                                    position={this.state.selectedLocation} />)
                        }
                    </Map>
                </div >
                {
                    (
                        this.state.selectedLocation == null ? null :
                            <div>
                                <p>Selected location: {this.state.selectedLocationName}</p>
                                <img alt={"Powered by Google"} src={poweredByGoogle} style={{
                                    height: '1.2rem',
                                    width: 'auto'
                                }}></img>
                            </div>
                    )
                }
            </div>
        );
    }
}

function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Your browser does not support Geolocation!');
            return;
        }
        navigator.geolocation.getCurrentPosition(resolve, (error) => {
            reject('Geolocation failed due to: ' + error);
        });
    });
}

function getPlaceId(google, location) {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ 'location': location }, (results, status) => {
            if (status !== google.maps.GeocoderStatus.OK)
                reject('Geocoder failed due to: ' + status);
            else if (!results[1])
                reject('No results found');
            else
                resolve(results[1].place_id);
        });
    });
}

function getPlaceName(google, placeId) {
    const placeService = new google.maps.places.PlacesService(document.createElement('div'));
    const request = {
        placeId: placeId,
        fields: ['formatted_address']
    };
    return new Promise((resolve, reject) => {
        placeService.getDetails(request, (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK)
                reject('Place Service failed due to: ' + status);
            else
                resolve(place.formatted_address);
        });
    });
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBA_zkF41AfqEybRL2E551rDt9Hs5-UwU8'
})(LocationSelector)