import axios from 'axios';
import { RETRIEVE_POST } from 'constants/links.js';

export const fetchPost = async (postId) => {
  let url = RETRIEVE_POST + "?postId=" + postId;
  let post = null;
  await axios
    .post(url, {})
    .then(response => {
      const { data } = response;
      post = data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return post;
}