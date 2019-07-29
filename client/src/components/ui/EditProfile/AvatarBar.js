import React from 'react';
import { Upload, Button, Icon, notification, message } from 'antd';

import { isItImage } from 'helpers/StringProcess';
import { PLEASE_UPLOAD_IMAGE } from 'constants/Notification';

class AvatarBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUploadList: false,
      fileList: [],
    }
  }

  onChange = async (info) => {
    const { editUserData } = this.props;
    this.setState({ fileList: info.fileList })
    this.setState({ showUploadList: true });
    const { status } = info.file;
    if (status === 'done') {
      const type = info.file.type;
      if (!isItImage(type)) {
        notification.error(PLEASE_UPLOAD_IMAGE);
      }
      else {
        message.success(`${info.file.name} file uploaded successfully.`);
        editUserData('newAvatar', info.file.originFileObj);
      }
      this.setState({ showUploadList: false });
      this.setState({ fileList: [] })
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      this.setState({ fileList: [] })
      this.setState({ showUploadList: false });
    }
  }

  render() {
    const { showUploadList } = this.state;
    const { newAvatar, avatarUrl } = this.props.userData;
    let url = avatarUrl.value;
    if (newAvatar !== null)
      url = newAvatar && URL.createObjectURL(newAvatar);
    return (
      <div className="mb-4">
        <img
          className='center mb-2'
          style={{
            display: 'block',
            maxWidth: '80%',
            width: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          src={url}
          alt="Avatar"
        />
        <Upload
          style={{
            width: '100%',
            display: 'block'
          }}
          showUploadList={showUploadList}
          onChange={this.onChange}
          fileList={this.state.fileList}>
          <Button block={true}>
            <Icon type="upload" /> Change avatar
          </Button>
        </Upload>
      </div>
    );
  }
}

export default AvatarBar;