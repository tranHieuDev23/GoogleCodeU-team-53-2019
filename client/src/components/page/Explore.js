import React from 'react';
import { withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper } from "google-maps-react";
import { fetchPost, fetchPostsWithLocation } from 'helpers/LoadPost'
import { getCurrentLocation } from "../../helpers/LocationHelper";
import { GOOGLE_MAPS_API_KEY } from '../../constants/apiKey';
import SinglePost from '../ui/Post/SinglePost';
import CustomMarker from 'components/ui/explore/CustomMarker';
import { addSearchBox } from 'components/ui/PlaceSearchBox';
import { Button } from 'antd';

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
      activePost: null,
      likePopup: null
    };
    this.boundsChangeCount = 0;

    this.loadPosts = this.loadPosts.bind(this);
    this.setToCurrentLocation = this.setToCurrentLocation.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
    this.onBoundsChanged = this.onBoundsChanged.bind(this);
    this.createMarkerClickedListener = this.createMarkerClickedListener.bind(this);
    this.onPostUpdated = this.onPostUpdated.bind(this);
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

  onMapReady(mapProps, map) {
    const { google } = mapProps;
    addSearchBox(google, map, (place) => {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      const bounds = new this.props.google.maps.LatLngBounds();
      const delta = [-0.25, 0.25];
      delta.forEach(dLat => {
        delta.forEach(dLng => {
          bounds.extend({ lat: location.lat + dLat, lng: location.lng + dLng });
        });
      });
      this.setState({ bounds: bounds });
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
    return () => {
      this.setState({
        activePost: post,
      });
    }
  }

  onPostUpdated = async (index, oldPopup) => {
    if (this.state.activePost === null)
      return;
    const updatedPost = await fetchPost(this.state.activePost.id);
    this.setState({
      activePost: updatedPost,
      likePopup: oldPopup
    });
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
        <CustomMarker
          key={post.id}
          title={post.author.username}
          position={{
            lat: post.location.latitude,
            lng: post.location.longitude
          }}
          onClick={onClickListener} />
      )
    });

    return (
      <div className='container pt-2'>
        <h1 className='center'>Explore</h1>
        <div className="mb-3">
          <Button
            icon='environment'
            size='large'
            onClick={this.setToCurrentLocation}>
            Set to current location
          </Button>
        </div>

        <div style={style}>
          <Map
            google={this.props.google}
            bounds={this.state.bounds}
            style={style}
            onReady={this.onMapReady}
            onBounds_changed={this.onBoundsChanged}>
            {postMarkers}
          </Map>
        </div >
        {
          (this.state.activePost === null)
            ? <div />
            : (
              <div className="pt-4">
                <SinglePost
                  userStatus={this.props.userStatus}
                  post={this.state.activePost}
                  withComment={false}
                  popup={this.state.likePopup}
                  onChangePost={this.onPostUpdated} />
              </div>
            )
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(withRouter(Explore));
