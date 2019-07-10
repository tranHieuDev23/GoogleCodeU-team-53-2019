import React from 'react';

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
    let arr = [...this.props.postDetail.images];
    arr.push(this.state);
    this.props.onChange("images", arr);
    this.props.handleClose();
  }

  render() {
    return (
      <div className="UploadImage">
        <input ref={this.upload} style={{'display': 'none'}} type="file" name="file" onChange={this.fileHandleChange}/>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter image description here"
          onChange={this.textHandleChange}
        />
       <div style={{display: 'flex', justifyContent: 'center'}}>
          <button onClick={this.handleAddPicure} className="btn btn-primary">Add this picture</button>
        </div>
      </div>
    );
  }
}

export default UploadImage;