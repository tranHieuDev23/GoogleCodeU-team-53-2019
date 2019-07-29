import React from 'react';
import { Icon } from 'antd';
import EditProfileForm from './EditProfileForm';

class EditProfileWrapper extends React.Component {
  render() {
    return (
      <div>
        <div className="EditProfile">
          <span>
            <Icon type='edit' />
            Edit profile
          </span>
        </div>
        <EditProfileForm {...this.props} />

      </div>
    );
  }
}

export default EditProfileWrapper;