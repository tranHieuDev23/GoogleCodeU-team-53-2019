import React from 'react';
import axios from 'axios';
import { CREATE_POST } from 'constants/links';
import Popup from '../ui/Popup/Popup';
import RichTextEditor from 'components/ui/RichTextEditor';
import AddedPicture from '../ui/AddedPicture';
import 'css/UploadPage.scss';
import { POST_PAGE } from 'constants/links';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom'

class UploadPage extends React.Component {
  constructor() {
    super();

    this.handleSetState = this.handleSetState.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handlePostDescription = this.handlePostDescription.bind(this);
    this.handleAddPicture = this.handleAddPicture.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);

    this.state = {
      description: '',
      images: [],
      popup: false,
      disabled: false,
    };
  }

  handleChangePopup = (newPopup) => {
    this.setState({popup: newPopup});
  }

  componentDidMount = () => {
  }

  handleSetState = (name, newState) => {
    this.setState({ [name]: newState });
  };

  handlePost = async (event) => {
    this.setState({ disabled: true });
    const data = new FormData();
    const { images } = this.state;
    let count = 0;
    const obj = {
      descriptionText: this.state.description,
      imageDescriptions: [],
      tags: [],
      location: null
    };
    for (let i = 0; i < images.length; i++) {
      if (images[i].selectedFile != null) {
        count++;
        obj.imageDescriptions.push(images[i].imageDescription);
      }
    }
    if (count === 0) {
      notification.error({
        message: 'Can not upload',
        description: 'Please insert your images and upload again',
      })
      this.setState({ disabled: false });
    }
    else {
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
          notification.success({
            message: 'Upload completed',
            description: 'Redirecting to new post page',
          })
          this.props.history.push(POST_PAGE + '/' + id);
        })
        .catch(() => {
          notification.error({
            message: 'Can not upload',
            description: 'Please check your connection and upload again!!!',
          }
          )
        })
      this.setState({ disabled: false });
    }
  };

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

  render() {
    return (
      <div className='UploadPage container pt-2'>
        <h1>Create new post:</h1>
        <RichTextEditor
          description='Please enter description here'
          value={this.state.description}
          handleChange={this.handlePostDescription}
        />
        {}
        <div className='mt-2'>

          <Button
            onClick={this.handleAddPicture}
            size='large'
            icon='upload'
          >
            Add new picture
          </Button>

          <Button
            type='dashed'
            size='large'
            icon='tags'
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
            onClick={() => {this.props.history.push('/')}}
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
    );
  }
}

export default withRouter(UploadPage);
