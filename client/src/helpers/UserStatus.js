import {
  LOGIN_STATUS,
} from 'constants/links.js';
import { SERVER_OK } from 'constants/webCodes.js';

export const fetchLoginStatus =  async () => {
  let res = {
    userEmail: '',
    userId: null,
  }
  
  await fetch(LOGIN_STATUS)
    .then(response =>
      response.status === SERVER_OK ? response.json() : null
    )
    .then(status => {
      if (status.isLoggedIn) {
        let userStatus = JSON.parse(status.userData);
        res.userEmail = userStatus.username;
        res.userId = userStatus.id;
        console.log(res);
      }
    }).catch(function () {
      console.log("error when fetch login status");
    })
  return res;
  }