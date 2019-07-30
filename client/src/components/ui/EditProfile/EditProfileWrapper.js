import React from 'react';
import EditProfileForm from './EditProfileForm';

class EditProfileWrapper extends React.Component {
  render() {
    return (
      <div className='container pt-2'>
        <h1 className='center'>Edit Profile</h1>
        <EditProfileForm {...this.props} />
      </div>
    );
  }
}

export default EditProfileWrapper;