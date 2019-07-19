import axios from 'axios';
import { RETRIEVE_USER, RETRIEVE_USERS } from 'constants/links.js';
import { addFirstParamToUrl } from 'helpers/FetchServer'

export const fetchUser = async (userId) => {
  let url = RETRIEVE_USER + "?userId=" + userId;
  let user = null;
  await axios
    .post(url, {})
    //.post('/api/TestUser', {})
    .then(response => {
      const { data } = response;
      user = data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return user;
}

export const fetchUsers = async (ids) => {
  let url = RETRIEVE_USERS;
  url = addFirstParamToUrl(url, 'userIds', JSON.stringify(ids));
  let users = null;
  await axios
    .post(url, {})
    //.post('/api/TestUsers', {})
    .then(response => {
      const { data } = response;
      users = data.users;
    })
    .catch(function (error) {
      console.log(error);
    });
  return users;
}