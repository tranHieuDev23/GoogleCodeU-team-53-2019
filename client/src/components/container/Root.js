import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

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
  RETRIEVE_POSTS
} from 'constants/links.js';
import UploadPage from '../page/UploadPage';
import PostPage from 'components/page/PostPage.js';
import Login from 'components/page/Login';
import axios from 'axios'
import 'css/Post.scss';

/** Renders all components in the <root> element on ../public/index.html. */
class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <CustomNavBar />
          <Switch>
            <Route exact path={'/login'} component={Login} />
            <Route exact path={HOME} component={Home} />
            <Route exact path={ABOUT_US} component={AboutUs} />
            <Route exact path={USER_PAGE + '/:userId'} component={UserPage} />
            <Route exact path={UPLOAD_PAGE} component={UploadPage} />
            <Route exact path={POST_PAGE} component={PostPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
