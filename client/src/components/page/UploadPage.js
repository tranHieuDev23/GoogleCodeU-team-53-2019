import React from 'react';
import axios from 'axios'
import { CREATE_POST } from 'constants/links';
import Popup from '../ui/Popup/Popup';
import RichTextEditor from 'components/ui/RichTextEditor'
import AddedPicture from '../ui/AddedPicture';
import 'css/UploadPage.scss';

class UploadPage extends React.Component {
  constructor() {
    super();

    this.handleSetState = this.handleSetState.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handlePostDescription = this.handlePostDescription.bind(this);
    this.handleAddPicture = this.handleAddPicture.bind(this);

    this.state = {
      description: "Test",
      images: [],
      popup: false,
      curImageIndex: 0,
    }

  }

  handleSetState = (name, newState) => {
    this.setState({ [name]: newState });
  }

  handlePost = (event) => {
    const data = new FormData();
    data.append('description', this.state.description);
    const { images } = this.state;
    for (let i = 0; i < images.length; i++) {
      if (images[i].selectedFile != null) {
        data.append('images', images[i].selectedFile);
        data.append('imageDescription', images[i].imageDescription);
      }
    }
    axios.post(CREATE_POST, data, {

    })
  }

  handlePostDescription = (newState) => {
    this.setState({ description: newState });
  }

  handleClosePopup = () => {
    console.log('Wrapper')
    if (this.state.popup) {
      this.setState({
        popup: false
      })
    }
  }

  handleAddPicture = (event) => {
    event.stopPropagation();
    if (!this.state.popup)
      this.setState((oldState, newProps) => {
        return { popup: !oldState.popup }
      })
  }

  render() {
    console.log(this.state.images);
    return (
      <div className="UploadPage">
        <h2>Create new post:</h2>
        <RichTextEditor
          description="Please enter description here"
          value={this.state.description}
          handleChange={this.handlePostDescription}
        />
        {}
        <button onClick={this.handleAddPicture} className="btn btn-success">Add new picture</button>
        <button onClick={this.handlePost} className="btn btn-primary">Share this post</button>
        <AddedPicture images={this.state.images}/>
        {this.state.popup ?
          <Popup
            handleClose={this.handleClosePopup}
            postDetail={this.state}
            onChange={this.handleSetState}
          /> :
          null
        }
      </div>
    );
  }
}

export default UploadPage;