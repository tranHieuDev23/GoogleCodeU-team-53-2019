import React from 'react';
import { withRouter } from 'react-router-dom';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import PostCard from '../ui/Post/PostCard';
import { fetchPostsWithLocation } from 'helpers/LoadPost'
import { getCurrentLocation } from "../../helpers/LocationHelper";
import { GOOGLE_MAPS_API_KEY } from '../../constants/apiKey';

const DEFAULT_BOUNDS = {
  sw: {
    lat: -12.375471986864,
    lng: 88.594382881345
  },
  ne: {
    lat: 31.291864723093,
    lng: 152.93774260658
  }
};

class Explore extends React.Component {
  constructor(props) {
    super(props);

    const bounds = new this.props.google.maps.LatLngBounds();
    bounds.extend(DEFAULT_BOUNDS.sw);
    bounds.extend(DEFAULT_BOUNDS.ne);

    this.state = {
      bounds: bounds,
      posts: [],
      activeMarker: null,
      activePost: null,
      showingInfoWindow: false
    };
    this.boundsChangeCount = 0;

    this.loadPosts = this.loadPosts.bind(this);
    this.setToCurrentLocation = this.setToCurrentLocation.bind(this);
    this.onBoundsChanged = this.onBoundsChanged.bind(this);
    this.createMarkerClickedListener = this.createMarkerClickedListener.bind(this);
  }

  componentDidMount() {
    this.setToCurrentLocation();
  }

  loadPosts = async (bounds) => {
    const maxCreationTime = new Date().getTime();
    const queryBounds = {
      sw: {
        lat: bounds.getSouthWest().lat(),
        lng: bounds.getSouthWest().lng()
      },
      ne: {
        lat: bounds.getNorthEast().lat(),
        lng: bounds.getNorthEast().lng()
      }
    }
    const posts = await fetchPostsWithLocation(maxCreationTime, 100, queryBounds);
    if (posts != null)
      this.setState({
        posts: posts
      });
  }

  setToCurrentLocation() {
    getCurrentLocation()
      .then((result) => {
        const location = {
          lat: result.coords.latitude,
          lng: result.coords.longitude
        };
        const bounds = new this.props.google.maps.LatLngBounds();
        const delta = [-0.25, 0.25];
        delta.forEach(dLat => {
          delta.forEach(dLng => {
            bounds.extend({ lat: location.lat + dLat, lng: location.lng + dLng });
          });
        });
        this.setState({ bounds: bounds });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onBoundsChanged(mapProps, map) {
    this.boundsChangeCount++;
    setTimeout(() => {
      this.boundsChangeCount--;
      if (this.boundsChangeCount === 0) {
        const newBounds = map.getBounds();
        this.loadPosts(newBounds);
      }
    }, 500);
  }

  createMarkerClickedListener(post) {
    return (props, marker) => {
      this.setState({
        activeMarker: marker,
        activePost: post,
        showingInfoWindow: true
      });
    }
  }

  render() {
    const style = {
      maxWidth: '100%',
      width: '800px',
      height: '450px',
      display: 'block'
    };

    const postMarkers = [];
    this.state.posts.forEach((post, index) => {
      const onClickListener = this.createMarkerClickedListener(post);
      postMarkers.push(
        <Marker
          key={index}
          title={post.author.username}
          position={post.location}
          onClick={onClickListener} />
      )
    });

    return (
      <div>
        <div className="py-3">
          <button type="button" onClick={this.setToCurrentLocation}>Set to current location</button>
        </div>

        <div style={style}>
          <Map
            google={this.props.google}
            bounds={this.state.bounds}
            style={style}
            onBounds_changed={this.onBoundsChanged}>
            {postMarkers}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              {
                PostCard(this.state.activePost)
              }
            </InfoWindow>
          </Map>
        </div >
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(withRouter(Explore));
