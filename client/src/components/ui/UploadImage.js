import React from 'react';
import { Button, notification } from 'antd';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      imageDescription: '',
    }
    this.fileHandleChange = this.fileHandleChange.bind(this);
    this.textHandleChange = this.textHandleChange.bind(this);
    this.handleAddPicure = this.handleAddPicure.bind(this);

    this.upload = React.createRef(null);
  }

  componentDidMount = () => {
    this.upload.current.click();
  }

  fileHandleChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  textHandleChange = (event) => {
    const { value } = event.target;
    this.setState({ imageDescription: value });
  }

  handleAddPicure = () => {
    if (this.state.selectedFile == null) {
      notification.error({
        message: 'Error when upload',
        description: 'You must choose an picture to upload'
      })
      this.props.handleClose();
    }
    else {
      const { type } = this.state.selectedFile;
      if (String(type).indexOf('image') !== 0) {
        notification.error({
          message: 'Error when upload',
          description: 'You may upload only images file',
        })
        this.props.handleClose();
      }
      else {
        let arr = [...this.props.postDetail.images];
        arr.push(this.state);
        this.props.onChange("images", arr);
        this.props.handleClose();
      }
    }
  }

  closePopup = () => {
    this.props.handleClose();
  }

  render() {
    return (
      <div className="UploadImage">
        <input
          ref={this.upload}
          style={{ 'display': 'none' }}
          type="file"
          name="file"
          onChange={this.fileHandleChange}
        />
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter image description here"
          onChange={this.textHandleChange}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={this.handleAddPicure}
            size="large"
            type="dashed"
            icon="cloud-upload"
          >
            Add this picture
          </Button>

          <Button
            onClick={this.closePopup}
            size='large'
            icon='close-square'
            type='danger'
          >
            Cancel upload
          </Button>
        </div>
      </div>
    );
  }
}

export default UploadImage;