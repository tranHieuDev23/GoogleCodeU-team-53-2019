import React from 'react';
import { Upload, Icon, message } from 'antd';

const { Dragger } = Upload;

const imageProps = {
  name: 'file',
  multiple: false,
};

class UploadSinglePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUploadList: true,
      fileList: [],
    }
  }

  onChange = async (info) => {
    const { images, handleChangeProps } = this.props;
    this.setState({ fileList: info.fileList })
    this.setState({ showUploadList: true });
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(info.file.originFileObj);
      const newImages = [...images]
      newImages.push(info.file.originFileObj);
      handleChangeProps('images', newImages)
      this.setState({ showUploadList: false });
      this.setState({ fileList: [] })
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);

      this.setState({ fileList: [] })
      this.setState({ showUploadList: false });
    }
  }

  render() {

    return (
      <div>
        <br></br>
        <Dragger {...imageProps}
          showUploadList={this.state.showUploadList}
          onChange={this.onChange}
          fileList={this.state.fileList}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag image to this area to upload</p>
          <p className="ant-upload-hint">
            Please pload your images here!
         </p>
        </Dragger>,
      </div>
    );
  }
}

export default UploadSinglePicture;