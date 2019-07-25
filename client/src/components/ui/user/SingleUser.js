import React from 'react';
import { USER_PAGE } from 'constants/links.js';
import { withRouter } from 'react-router-dom';
import { isThisPathUserPage } from 'helpers/StringProcess';

class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      avatarUrl: {
        value: ''
      }
    };
  }

  componentDidMount = () => {
    const { id, username, avatarUrl } = this.props.user;
    this.setState({ id });
    this.setState({ username });
    this.setState({ avatarUrl });
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <React.Fragment>
        {isThisPathUserPage(pathname) ? (
          <a href={USER_PAGE + '/' + this.state.id.toString()}>
            <div className='Post__Author'>
              <img
                src={this.state.avatarUrl.value}
                className='Post__Author__Avatar'
                alt='avatar'
              />
              <div className='Post__Author__Wrapper'>
                <div className='Post__Author__Username'>
                  {this.state.username}
                </div>
              </div>
            </div>
          </a>
        ) : (
          <div
            className='Post__Author'
            onClick={() => {
              this.props.history.push(
                USER_PAGE + '/' + this.state.id.toString()
              );
            }}>
            <img
              src={this.state.avatarUrl.value}
              className='Post__Author__Avatar'
              alt='avatar'
            />
            <div className='Post__Author__Wrapper'>
              <div className='Post__Author__Username'>
                {this.state.username}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(SingleUser);
