import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUser } from 'helpers/LoadUser';
import PleaseLogin from 'components/Result/PleaseLogin';
import Loading from './Loading';
import EditProfileWrapper from 'components/ui/EditProfile/EditProfileWrapper';
import { Button } from 'antd';
import { changeProfile } from 'helpers/ChangeProfile';
import { USER_PAGE } from 'constants/links';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: '',
      bioText: '',
      birthDate: '',
      avatarUrl: null,
      newAvatar: null,
      didMount: false,
    }
  }

  componentDidMount = async () => {
    const { isLogin, userId } = this.props.userStatus;
    if (isLogin) {
      const user = await fetchUser(userId);
      let newBirthDate = '';
      if (user.birthdate !== null && user.birthdate !== undefined) {
        newBirthDate = user.birthdate; 
      }
      this.setState({
        id: user.id,
        username: user.username,
        bioText: user.bioText,
        birthDate: newBirthDate,
        avatarUrl: user.avatarUrl,
      });
    }
    this.setState({ didMount: true });
  }

  handleSetState = (name, value) => {
    this.setState({ [name]: value });
  }

  handleSubmit = async () => {
    const updateStatus = await changeProfile(this.state);
    const { id } = this.state;
    if (updateStatus)
      this.props.history.push(USER_PAGE + '/' + id);
  }

  render() {
    const { isLogin, fetchedStatus } = this.props.userStatus;
    const { didMount } = this.state;
    return (
      <React.Fragment>
        {!fetchedStatus || !didMount ? (
          <Loading />
        ) : (
            <React.Fragment>
              {(isLogin) ? (
                <div>
                  <EditProfileWrapper
                    userData={this.state}
                    editUserData={this.handleSetState}
                  />
                  <div className="EditProfile">
                    <Button type='primary' onClick={this.handleSubmit}>Change profile</Button>
                  </div>
                </div>
              ) : (
                  <PleaseLogin />
                )
              }
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

export default withRouter(EditProfile);