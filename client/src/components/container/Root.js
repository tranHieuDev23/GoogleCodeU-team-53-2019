import React, { Suspense, Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import AboutUs from 'components/page/AboutUs.js';
import CustomNavBar from 'components/ui/CustomNavBar.js';
import Home from 'components/page/Home.js';
import UserPage from 'components/page/UserPage.js';
import {
  ABOUT_US,
  HOME,
  USER_PAGE,
  UPLOAD_PAGE,
  POST_PAGE,
  TAG_PAGE,
  EXPLORE_PAGE,
  PLEASE_LOGIN,
  EDIT_PROFILE_PAGE,
  LOGIN_PAGE
} from 'constants/links.js';
import UploadPage from 'components/page/UploadPage';
import PostPage from 'components/page/PostPage.js';
import Explore from "components/page/Explore.js";
import { fetchLoginStatus } from 'helpers/UserStatus.js'
import TagPage from 'components/page/TagPage'
import "antd/dist/antd.css";
import 'css/Post.scss';
import 'css/index.scss'
import PleaseLogin from 'components/Result/PleaseLogin';
import EditProfile from 'components/page/EditProfile';
import LoginPage from 'components/page/LoginPage';

/** Renders all components in the <root> element on ../public/index.html. */
class Root extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      userEmail: '',
      userId: null,
      fetchedStatus: false,
    };
    this.handleSetState = this.handleSetState.bind(this);
  }

  componentDidMount = async () => {
    const status = await fetchLoginStatus();
    this.setState({
      userEmail: status.userEmail,
      isLogin: !!status.userEmail,
      userId: status.userId,
      fetchedStatus: true,
    });
  };

  handleSetState = (name, newState) => {
    this.setState({ [name]: newState });
  };

  render() {
    const withStatusHome = (
      Component,
      userStatus,
      handleUserStatus
    ) => props => (
      <Component
        {...props}
        userStatus={userStatus}
        handleUserStatus={handleUserStatus}
      />
    );

    return (
      <BrowserRouter>
        <div className='App'>
          <CustomNavBar
            userStatus={this.state}
            handleUserStatus={this.handleSetState}
          />
          <Suspense fallback='Loading...'>
            <Switch>
              <Route exact path={PLEASE_LOGIN} component={PleaseLogin} />
              <Route
                exact
                path={LOGIN_PAGE}
                component={withStatusHome(
                  LoginPage,
                  this.state,
                  this.handleSetState
                )}
              />
              <Route
                exact
                path={HOME}
                component={withStatusHome(
                  Home,
                  this.state,
                  this.handleSetState
                )}
              />
              <Route
                exact
                path={ABOUT_US}
                component={withStatusHome(
                  AboutUs,
                  this.state,
                  this.handleSetState
                )}
              />
              <Route
                exact
                path={TAG_PAGE + '/:tagName'}
                component={withStatusHome(
                  TagPage,
                  this.state,
                  this.handleSetState
                )}
              />
              <Route
                exact
                path={USER_PAGE + '/:userId'}
                component={withStatusHome(
                  UserPage,
                  this.state,
                  this.handleSetState
                )}
              />
              <Route
                exact
                path={UPLOAD_PAGE}
                component={withStatusHome(
                  UploadPage,
                  this.state,
                  this.handleSetState
                )}
              />
              <Route
                exact
                path={POST_PAGE + '/:postId'}
                component={withStatusHome(
                  PostPage,
                  this.state,
                  this.handleSetState
                )}
              />
              <Route
                exact path={EXPLORE_PAGE}
                component={withStatusHome(Explore, this.state, this.handleSetState)}
              />
              <Route
                exact path={EDIT_PROFILE_PAGE}
                component={withStatusHome(EditProfile, this.state, this.handleSetState)}
              />
              <Redirect from="/" to={HOME} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
