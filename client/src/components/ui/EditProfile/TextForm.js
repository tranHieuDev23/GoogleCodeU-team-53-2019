import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 18 },
  },
};

class TextFrom extends React.Component {

  onChangeInput = e => {
    const { name, value } = e.target;
    const { editUserData } = this.props;
    editUserData(name, value);
  };

  onChangeBirhdate = (date, dateString) => {
    const { birthDate } = this.props.userData;
    const { editUserData } = this.props;
    if (dateString !== birthDate) {
      editUserData('birthDate', dateString);
    }
  }

  disabledDate = (value) => {
    const leftLimit = moment('01/01/1950', dateFormat);
    const rightLimit = moment();
    return value.valueOf() < leftLimit.valueOf() || value.valueOf() > rightLimit.valueOf();
  }

  render() {
    const { username, bioText, birthDate } = this.props.userData;
    const cleanBirthDate = (birthDate.length > 0) ? moment(birthDate, dateFormat) : null;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="Username">
          <Input
            name="username"
            onChange={this.onChangeInput}
            defaultValue={username}
          />
        </Form.Item>
        <Form.Item label="Birthdate">
          <DatePicker
            disabledDate={this.disabledDate}
            defaultValue={cleanBirthDate}
            format={dateFormat}
            onChange={this.onChangeBirhdate}
          />
        </Form.Item>
        <Form.Item label="Biography text">
          <Input
            name="bioText"
            onChange={this.onChangeInput}
            defaultValue={bioText}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default TextFrom;
