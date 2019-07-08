import React from 'react';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedFile: null,
      imageDescription: '',
    }

    let id = this.props.imageId;
    while (this.props.postDetail.images.length < id + 1)  {
      this.props.postDetail.images.push(this.state);
    }

    this.fileHandleChange = this.fileHandleChange.bind(this);
    this.textHandleChange = this.textHandleChange.bind(this);
    this.handleAddPicure = this.handleAddPicure.bind(this);
  }
  
  fileHandleChange = (event)  =>  {
    this.setState({selectedFile: event.target.files[0]})
  }

  textHandleChange = (event) => {
    const {value} = event.target;
    this.setState({imageDescription: value});
  }

  handleAddPicure = ()  =>  {
    let id = this.props.imageId;
    let arr = [...this.props.postDetail.images];
    arr[id] = this.state;
    this.props.onChange("images", arr);
  }

  render()  {
    return (
      <div>
        <input type="file" name="file" onChange={this.fileHandleChange}/>
        <input type="text" onChange={this.textHandleChange}/>
        <button onClick={this.handleAddPicure}>Add this picture</button>
      </div>
    );
  }
}

export default UploadImage;