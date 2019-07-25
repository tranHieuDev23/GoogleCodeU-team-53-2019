import React from 'react';
import { differentFromNow } from 'helpers/Time';
import { USER_PAGE } from 'constants/links.js';
import { withRouter } from 'react-router-dom';
import { GoogleApiWrapper } from 'google-maps-react';
import { getPlaceName } from '../../../helpers/LocationHelper';
import { GOOGLE_MAPS_API_KEY } from '../../../constants/apiKey';

class PostAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationId: null,
      locationName: null
    };
    this.applyLocationName = this.applyLocationName.bind(this);
    this.applyLocationName(this.props.post.location);
  }

  componentDidUpdate() {
    this.applyLocationName(this.props.post.location);
  }

  applyLocationName(location) {
    if (location.placeId == this.state.locationId)
      return;
    this.setState({
      locationId: location.placeId,
      locationName: null
    });
    const { google } = this.props;
    getPlaceName(google, location.placeId).then((result) => {
      this.setState({
        locationName: result
      });
    });
  }

  render() {
    const { author, creationTime } = this.props.post;

    return (
      <div className='Post__Author'>
        <img
          src={author.avatarUrl.value}
          className='Post__Author__Avatar'
          alt='avatar'
        />
        <div className='Post__Author__Wrapper'>
          <div
            className='Post__Author__Username'
            onClick={() => {
              this.props.history.push(USER_PAGE + '/' + author.id.toString());
            }}>
            {author.username}
          </div>
          <div className='Post__Author__Time'>
            {differentFromNow(creationTime)}
          </div>
          {this.state.locationName == null ? null : (
            <div className='Post__Author__Time'>{this.state.locationName}</div>
          )}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(withRouter(PostAuthor));
