import axios from 'axios';
import { DELETE_POST } from 'constants/links.js';
import { addFirstParamToUrl } from 'helpers/FetchServer';
import { notification } from 'antd';
import { SOMETHING_WRONG, CANT_DELETE, DELETE_POST_SUCCESS } from 'constants/Notification';

export const deletePost = async (postId) => {
  let url = DELETE_POST;
  url = addFirstParamToUrl(url, 'postId', postId);
  let result = false;
  await axios
    .post(url, {})
    .then(() => {
      notification.success(DELETE_POST_SUCCESS);
      result = true;
    })
    .catch((error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          notification.error(CANT_DELETE);
        }
        else notification.error(SOMETHING_WRONG);
      }
    });
  return result;
}