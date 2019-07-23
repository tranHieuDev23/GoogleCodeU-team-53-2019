import React from 'react';
import axios from 'axios';
import { CREATE_POST } from 'constants/links';
import Popup from '../ui/Popup/Popup';
import RichTextEditor from 'components/ui/RichTextEditor';
import AddedPicture from '../ui/AddedPicture';
import { POST_PAGE } from 'constants/links';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom'
import TagGroup from '../ui/tag/TagGroup';
import {
  SUGGEST_COMPLETED,
  SUGGEST_NO_IMAGE,
  UPLOAD_CONNECTION_FAIL,
  UPLOAD_SUCCESS,
  UPLOAD_NO_IMAGE,
  UPLOAD_NO_LOCATION
} from 'constants/Notification.js';
import { fetchTags } from 'helpers/LoadTags';
import { tagSanitization } from 'helpers/TagValidate';
import LocationSelector from '../ui/LocationSelector';
import PleaseLogin from 'components/Result/PleaseLogin';

class UploadPage extends React.Component {
  constructor() {
    super();

    this.handleSetState = this.handleSetState.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handlePostDescription = this.handlePostDescription.bind(this);
    this.handleAddPicture = this.handleAddPicture.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.getSuggestionTags = this.getSuggestionTags.bind(this);
    this.handleLocation = this.handleLocation.bind(this);

    this.state = {
      description: '',
      images: [],
      tags: [],
      location: null,
      popup: false,
      disabled: false,
      sugessting: false,
    };
  }

  handleChangePopup = (newPopup) => {
    this.setState({ popup: newPopup });
  }

  componentDidMount = () => {
  }

  handleSetState = (name, newState) => {
    this.setState({ [name]: newState });
  };

  handlePost = async (event) => {
    if (this.state.location == null) {
      notification.error(UPLOAD_NO_LOCATION);
      return;
    }

    const { images } = this.state;
    let imageDescriptions = [];
    let count = 0;
    for (let i = 0; i < images.length; i++) {
      if (images[i].selectedFile != null) {
        count++;
        imageDescriptions.push(images[i].imageDescription);
      }
    }
    if (count === 0) {
      notification.error(UPLOAD_NO_IMAGE);
      return;
    }

    this.setState({ disabled: true });

    const data = new FormData();
    const obj = {
      descriptionText: this.state.description,
      imageDescriptions: imageDescriptions,
      tags: tagSanitization(this.state.tags),
      location: this.state.location
    };


    data.append('postDetails', JSON.stringify(obj));
    let cnt = 0;
    for (let i = 0; i < images.length; i++) {
      if (images[i].selectedFile != null) {
        data.append('file-' + cnt, images[i].selectedFile);
        ++cnt;
      }
    }

    await axios.post(CREATE_POST, data, {})
      .then(respone => {
        const { data } = respone;
        const id = data.id;
        notification.success(UPLOAD_SUCCESS)
        this.props.history.push(POST_PAGE + '/' + id);
      })
      .catch(() => {
        notification.error(UPLOAD_CONNECTION_FAIL)
      });
    this.setState({ disabled: false });
  };

  getSuggestionTags = async () => {
    this.setState({ sugessting: true });
    let suggestionTags = null;

    // build form data 
    const data = new FormData();
    const { images } = this.state;
    let count = 0;
    for (let i = 0; i < images.length; i++)
      if (images[i].selectedFile != null) count++;
    if (count === 0) {
      notification.error(SUGGEST_NO_IMAGE)
      this.setState({ sugessting: false });
    }
    else {
      data.append('numberOfImages', count);
      let cnt = 0;
      for (let i = 0; i < images.length; i++) {
        if (images[i].selectedFile != null) {
          data.append('file-' + cnt, images[i].selectedFile);
          ++cnt;
        }
      }
      // end of make form data 

      // fetch tag here
      suggestionTags = await fetchTags(data);
      if (Array.isArray(suggestionTags)) {
        let newTags = [...this.state.tags];
        for (let i = 0; i < suggestionTags.length; i++) {
          const item = suggestionTags[i];
          if (!newTags.includes(item))
            newTags.push(item);
        }
        this.setState({ tags: newTags });
        notification.success(SUGGEST_COMPLETED)
      }
      this.setState({ sugessting: false });
    }
  }

  onChangeTags = (newTags) => {
    this.setState({ tags: newTags });
  }

  handlePostDescription = newState => {
    this.setState({ description: newState });
  };

  handleClosePopup = () => {
    if (this.state.popup) {
      this.setState({
        popup: false
      });
    }
  };

  handleAddPicture = event => {
    event.stopPropagation();
    if (!this.state.popup)
      this.setState((oldState, newProps) => {
        return { popup: !oldState.popup };
      });
  };

  handleLocation = location => {
    this.handleSetState('location', location);
    console.log(location);
  }

  render() {
    const { isLogin } = this.props.userStatus;
    return (
      <React.Fragment>
        {(isLogin) ? (
          <div className='UploadPage container pt-2'>
            <h1>Create new post:</h1>
            <RichTextEditor
              description='Please enter description here'
              value={this.state.description}
              handleChange={this.handlePostDescription}
            />
            <TagGroup tags={this.state.tags} onChangeTags={this.onChangeTags} />

            <LocationSelector onLocationSelected={this.handleLocation}></LocationSelector>

            <div className='mt-2'>
              <Button
                onClick={this.handleAddPicture}
                size='large'
                icon='upload'
              >
                Add new picture
          </Button>

              <Button
                onClick={this.getSuggestionTags}
                type='dashed'
                size='large'
                icon='tags'
                loading={this.state.sugessting}
              >
                Get suggestion tag
          </Button>

              <Button
                onClick={this.handlePost}
                type='primary'
                icon='share-alt'
                size='large'
                disabled={this.state.disabled}
              >
                Share this post
          </Button>

              <Button
                onClick={() => { this.props.history.push('/') }}
                type='danger'
                icon='close'
                size='large'
                disabled={this.state.disabled}
              >
                Close this post
          </Button>
            </div>
            <AddedPicture
              images={this.state.images}
            />
            {this.state.popup ? (
              <Popup
                handleClose={this.handleClosePopup}
                postDetail={this.state}
                onChange={this.handleSetState}
              />
            ) : null}
          </div>
        ) : (
            <PleaseLogin />
          )}
      </React.Fragment>
    );
  }
}

export default withRouter(UploadPage);
