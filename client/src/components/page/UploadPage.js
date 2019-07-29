import React from 'react'
import axios from 'axios';
import { CREATE_POST } from 'constants/links';
import RichTextEditor from 'components/ui/RichTextEditor';
import { POST_PAGE } from 'constants/links';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import TagGroup from '../ui/tag/TagGroup';
import {
  SUGGEST_COMPLETED,
  UPLOAD_CONNECTION_FAIL,
  UPLOAD_SUCCESS,
  UPLOAD_NO_LOCATION
} from 'constants/Notification.js';
import { fetchTags } from 'helpers/LoadTags';
import LocationSelector from '../ui/LocationSelector';
import PleaseLogin from 'components/Result/PleaseLogin';
import UploadSinglePicture from 'components/ui/upload/UploadSinglePicture';
import UploadedPicture from 'components/ui/upload/UploadedPicture';
import { BuildFormDataToGetTag, BuildFormDataToUpload } from 'helpers/BuildFromData';

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfImages: 0,
      description: '',

      images: [],
      imageDescriptions: [],

      tags: [],
      location: null,
      disabled: false,
    }
  }

  handleSetState = (name, value) => {
    this.setState({ [name]: value });
  }

  componentDidUpdate = () => {
    let newNumberOfImages = 0;
    const { images, numberOfImages } = this.state;
    images.forEach(image => {
      if (image !== null)
        newNumberOfImages++;
    });
    if (newNumberOfImages !== numberOfImages)
      this.setState({ numberOfImages: newNumberOfImages });
  }

  getSugesstionTags = async () => {
    const { images } = this.state;
    const data = BuildFormDataToGetTag(images);
    if (data === null) return;
    const suggestionTags = await fetchTags(data);
    if (Array.isArray(suggestionTags)) {
      let newTags = [...this.state.tags];
      for (let i = 0; i < suggestionTags.length; i++) {
        const item = suggestionTags[i];
        if (!newTags.includes(item)) newTags.push(item);
      }
      this.setState({ tags: newTags });
      notification.success(SUGGEST_COMPLETED);
    }
  }

  handleLocation = location => {
    this.handleSetState('location', location);
  };

  handlePost = async event => {
    if (this.state.location == null) {
      notification.error(UPLOAD_NO_LOCATION);
      return;
    }
    this.setState({ disabled: true });
    const data = BuildFormDataToUpload(this.state);
    await axios
      .post(CREATE_POST, data, {})
      .then(respone => {
        const { data } = respone;
        const id = data.id;
        notification.success(UPLOAD_SUCCESS);
        this.props.history.push(POST_PAGE + '/' + id);
      })
      .catch(() => {
        notification.error(UPLOAD_CONNECTION_FAIL);
      });
    this.setState({ disabled: false });
  };

  render() {
    const { images, numberOfImages, imageDescriptions } = this.state;
    const { isLogin } = this.props.userStatus;

    return (
      <React.Fragment>
        {
          isLogin ? (
            <div>
              <h1 className='center'>Create your new post:</h1>
              <UploadedPicture
                images={images}
                imageDescriptions={imageDescriptions}
                handleChangeProps={this.handleSetState}
              />
              <UploadSinglePicture
                images={images}
                handleChangeProps={this.handleSetState}
              />
              {(numberOfImages) ? (
                <React.Fragment>
                  <RichTextEditor
                    description='Please enter your post description here'
                    value={this.state.description}
                    handleChange={(newState) => { this.setState({ description: newState }) }}
                  />
                  <TagGroup
                    tags={this.state.tags}
                    onChangeTags={(newState) => { this.setState({ tags: newState }) }}
                    getSugesstion={this.getSugesstionTags}
                  />
                  <LocationSelector onLocationSelected={this.handleLocation} />
                  <div className='mt-3'>
                    <Button className='mr-3'
                      onClick={this.handlePost}
                      type='primary'
                      icon='share-alt'
                      size='large'
                      disabled={this.state.disabled}>
                      Share this post
                    </Button>

                    <Button
                      onClick={() => {
                        this.props.history.push('/');
                      }}
                      type='danger'
                      icon='close'
                      size='large'
                      disabled={this.state.disabled}>
                      Close this post
                    </Button>
                  </div>
                </React.Fragment>
              ) : (<React.Fragment />)}
            </div>) : (
              <PleaseLogin />
            )
        }
      </React.Fragment>
    );
  }
}

export default withRouter(UploadPage);