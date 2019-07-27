import axios from 'axios';
import { RETRIEVE_POST, RETRIEVE_POSTS } from 'constants/links.js';
import { addFirstParamToUrl, addParamToUrl } from 'helpers/FetchServer';

export const fetchPost = async (postId, withComment = false) => {
  let url = RETRIEVE_POST + '?postId=' + postId;
  if (withComment) {
    url = addParamToUrl(url, 'withComment', 'true');
  }
  let post = null;
  await axios
    .post(url, {})
    //.post('/api/TestPost', {})
    .then(response => {
      const { data } = response;
      post = data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return post;
};

export const fetchPosts = async (
  maxCreationTime,
  limit,
  position,
  userId,
  tagName
) => {
  let url = RETRIEVE_POSTS;
  url = addFirstParamToUrl(url, 'maxCreationTime', maxCreationTime);
  url = addParamToUrl(url, 'limit', limit);
  if (position !== '') url = addParamToUrl(url, 'position', position);
  if (userId !== '') url = addParamToUrl(url, 'userId', userId);
  if (tagName !== '') url = addParamToUrl(url, 'tagName', tagName);
  let posts = null;
  await axios
    .post(url, {})
    //.post('/api/TestPosts', {})
    .then(response => {
      const { data } = response;
      posts = data.posts;
    })
    .catch(function (error) {
      console.log(error);
    });
  return posts;
}

export const fetchPostsWithLocation = async (maxCreationTime, limit, bound) => {
  let url = RETRIEVE_POSTS;
  url = addFirstParamToUrl(url, 'maxCreationTime', maxCreationTime);
  url = addParamToUrl(url, 'limit', limit);
  url = addParamToUrl(url, 'swLat', bound.sw.lat);
  url = addParamToUrl(url, 'swLng', bound.sw.lng);
  url = addParamToUrl(url, 'neLat', bound.ne.lat);
  url = addParamToUrl(url, 'neLng', bound.ne.lng);
  let posts = null;
  await axios
    .post(url, {})
    .then((response) => {
      const { data } = response;
      posts = data.posts;
    })
    .catch((error) => {
      console.log(error);
    })
  return posts;
};