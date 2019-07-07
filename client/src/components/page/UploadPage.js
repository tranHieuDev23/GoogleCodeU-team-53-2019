import React from 'react';
import UploadImage from 'components/ui/UploadImage';
import axios from 'axios'
import { CREATE_POST } from 'constants/serverLink'
class UploadPage extends React.Component {
  constructor() {
    super();

    this.handleSetState = this.handleSetState.bind(this);
    this.handlePost = this.handlePost.bind(this);

    this.state = {
      description: "Test",
      images: [],
    }


  }

  handleSetState = (name, newState) => {
    this.setState({ [name]: newState });
  }

  handlePost = (event) => {
    console.log("test");
    const data = new FormData();
    data.append('description', this.state.description);
    const {images} = this.state;
    for(let i = 0; i < images.length; i++)  {
      console.log(images.selectedFile);
      if (images[i].selectedFile != null) {
        
        data.append('image', images.selectedFile);
      }
    }
    axios.post(CREATE_POST, data, {

    })
  }

  render() {
    return (
      <div>
        <UploadImage postDetail={this.state} imageId={1} onChange={this.handleSetState} />
        <button onClick={this.handlePost}>Post</button>
      </div>
    );
  }


}

export default UploadPage;