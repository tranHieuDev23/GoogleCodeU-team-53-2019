import React from 'react';
import AvatarBar from './AvatarBar';
import { Row, Col } from 'antd';
import TextFrom from './TextForm';

class EditProfileForm extends React.Component {
  render() {
    return (
      <div>
        <br />
        <Row gutter={32} type="flex">
          <Col span={19} >

          <TextFrom {...this.props}/>
          </Col>
          <Col span={5}>

          <AvatarBar {...this.props}/>
          </Col>
        </Row>
      </div >
    );
  }
}

export default EditProfileForm;