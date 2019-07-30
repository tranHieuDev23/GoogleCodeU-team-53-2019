import React from 'react';
import AvatarBar from './AvatarBar';
import { Row, Col } from 'antd';
import TextFrom from './TextForm';

class EditProfileForm extends React.Component {
  render() {
    return (
      <div>
        <br />
        <Row gutter={24} type="flex">
          <Col md={18} >
            <TextFrom {...this.props} />
          </Col>
          <Col md={6}>
            <AvatarBar {...this.props} />
          </Col>
        </Row>
      </div >
    );
  }
}

export default EditProfileForm;