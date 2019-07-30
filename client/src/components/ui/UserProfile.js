import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { EDIT_PROFILE_PAGE } from 'constants/links';

class UserProfile extends React.Component {
  render() {
    const { profile, owner } = this.props;
    const url = profile.avatarUrl.value;
    return (
      <div className="user-profile">
        <Row gutter={16} type="flex" className="user-profile__row">
          <Col span={6} >
            <img src={url} alt={profile.username} />
          </Col>
          <Col span={17} offset={1}>
            <div className="user-profile__bio">
              <Row type="flex" className="user-profile__wrapper">
                <span className="user-profile__name">{profile.username}</span>
                {owner &&
                  <Button onClick={() => { this.props.history.push(EDIT_PROFILE_PAGE) }}>Edit profile</Button>
                }
              </Row>
              {(profile.birthdate !== '' && profile.birthdate !== undefined) &&
                <span className="user-profile__birthdate">{'Birthday: ' + profile.birthdate}</span>
              }
              <span className="user-profile__bioText">{profile.bioText}</span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(UserProfile);