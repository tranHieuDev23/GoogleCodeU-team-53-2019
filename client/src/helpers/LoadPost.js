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

// const DUMMY_RESPONSE = {"posts":[{"creationTime":1564483739892,"author":{"avatarUrl":{"value":"/static/media/user.svg"},"bioText":"","id":"111843582872314667010","username":"leesuyeon0506@gmail.com"},"likedUserIds":["118390528968028844749"],"location":{"latitude":37.60802302403063,"placeId":"ChIJpW9FNrOwfDURRKnr_GcxdjU","longitude":127.1400002887941},"descriptionText":"<p>This is where I do workout!<\/p>","id":"55346879-6ce3-473c-a2fe-ab4e68e8bfaa","postImages":[{"imageUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/2JRZN1fq-2019-07-30-104901500.jpeg?generation=1564483743683681&alt=media"},"imageDescription":"","postId":"55346879-6ce3-473c-a2fe-ab4e68e8bfaa","id":"39590b5c-9380-440b-b8c0-d6f535e4d0c6","orderInPost":0}],"tags":[{"id":"09e73792-b636-4db9-9978-b16f315d9216","tagName":"Sky"},{"id":"8b69f616-4b21-481b-afa1-73469d0c6a98","tagName":"Night"},{"id":"946d1b13-fd0d-47ee-a1c6-5719a3c34475","tagName":"Astronomical_object"},{"id":"6810b1c6-eb37-4453-93ac-7fc631036363","tagName":"Light"},{"id":"02376ac3-bbdf-4610-90ed-9b1d7be9f39c","tagName":"Atmospheric_phenomenon"}]},{"creationTime":1564371642219,"author":{"birthdate":"Tue Mar 02 00:00:00 UTC 1999","avatarUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/NzOqEBde-2019-07-29-170647492.jpg?generation=1564420009608466&alt=media"},"bioText":"Member of Team 53","id":"102855024025668661378","username":"Tran Minh Hieu"},"likedUserIds":["118390528968028844749"],"location":{"latitude":20.6546819,"placeId":"ChIJo3Hs4SrBNTERmLObap6ZMk0","longitude":106.05784900000003},"descriptionText":"<p>Shout out to team 2 and their project AvoAvo!<\/p>","id":"8c3d4f72-3745-41e5-8167-db3018345c8d","postImages":[{"imageUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/lmcUtOc7-2019-07-29-034043806.jpeg?generation=1564371645133401&alt=media"},"imageDescription":"","postId":"8c3d4f72-3745-41e5-8167-db3018345c8d","id":"b7f0faa3-6626-469c-a9fa-51a1882716e3","orderInPost":0}],"tags":[{"id":"410451ff-6543-418c-9db1-865822ff9b5f","tagName":"Avocado"},{"id":"3b610e1c-2c44-4322-b53e-fde8dc819776","tagName":"Food"},{"id":"db79e15f-ec99-4d9d-8946-9310a0c42af5","tagName":"Fruit"},{"id":"129894de-8f69-4e5c-9c33-656e8ee65135","tagName":"Ingredient"},{"id":"21028759-c13e-47f6-96ea-6fc7c7b3170f","tagName":"Produce"}]},{"creationTime":1564368256506,"author":{"birthdate":"Fri Apr 24 00:00:00 UTC 1998","avatarUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/voFIqdlX-2019-07-29-173117193.jpeg?generation=1564421479728956&alt=media"},"bioText":"","id":"118390528968028844749","username":"Hye In Kim"},"likedUserIds":["118390528968028844749"],"location":{"latitude":35.81219232525439,"placeId":"ChIJV2PNYj87cDURHWXzpmeYV9U","longitude":127.1077951275206},"descriptionText":"<p>Testing!<\/p>","id":"9b62962c-b422-48f1-ae49-c3b1776bf9d6","postImages":[{"imageUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/wLgQYcOW-2019-07-29-024417898.jpeg?generation=1564368259336377&alt=media"},"imageDescription":"sci-fi","postId":"9b62962c-b422-48f1-ae49-c3b1776bf9d6","id":"288182e3-c222-4198-a71c-bb4a47b4190b","orderInPost":0},{"imageUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/OYxBQQMM-2019-07-29-024419368.gif?generation=1564368259719407&alt=media"},"imageDescription":"","postId":"9b62962c-b422-48f1-ae49-c3b1776bf9d6","id":"ab4e66bd-3bbe-47cb-b864-f2e20fc54b69","orderInPost":1}],"tags":[{"id":"09e73792-b636-4db9-9978-b16f315d9216","tagName":"Sky"},{"id":"da5e705f-8dd2-409e-8c33-37a99e0f4568","tagName":"Atmosphere"},{"id":"eadd71ac-4d52-4091-aa41-2574b51a5adf","tagName":"Aurora"},{"id":"358e93b8-b516-4c6d-bfea-cbb119eb71ad","tagName":"Aerospace_engineering"},{"id":"8bc72caf-9660-4377-bec7-7b1b3cf74d07","tagName":"Space"}]},{"creationTime":1564336575574,"author":{"birthdate":"Mon Nov 08 00:00:00 UTC 1999","avatarUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/x6lU1BnH-2019-07-29-161325884.jpg?generation=1564416808000039&alt=media"},"bioText":"Hoàng Bảo Long","id":"102054012954120611259","username":"Hoàng Bảo Long"},"likedUserIds":["116530939333556981755","118390528968028844749"],"location":{"latitude":37.796424066471225,"placeId":"Eis3MTMgTW9ydG9uIFN0LCBTYW4gRnJhbmNpc2NvLCBDQSA5NDEyOSwgVVNBIhsSGQoUChIJhw5KFCmHhYAR3HhZ8yVUc7UQyQU","longitude":-122.45382899835687},"descriptionText":"<p>Hokage&nbsp;<\/p>","id":"92ee5442-2daf-4ebe-ba20-f0c17ec438f4","postImages":[{"imageUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/y5kXHgOV-2019-07-28-175618278.png?generation=1564336581144193&alt=media"},"imageDescription":"Naruto","postId":"92ee5442-2daf-4ebe-ba20-f0c17ec438f4","id":"79cc412c-8e26-4e5e-af27-dbe8ea9241b5","orderInPost":0}],"tags":[{"id":"74df92db-0c5f-4f7b-ae73-53486d4ae7bb","tagName":"Cartoon"},{"id":"24096fb8-8dc8-4136-a161-0a41f5c6a1ac","tagName":"Anime"},{"id":"bf7ad368-991c-495c-95dd-19ed9b4ffb9d","tagName":"Forehead"},{"id":"d2765094-4905-43ea-8f57-710093f8de8a","tagName":"Mouth"},{"id":"7dcd868b-532c-4529-a6f7-6456111a21d0","tagName":"Line"}]},{"creationTime":1564335355002,"author":{"birthdate":"Mon Nov 08 00:00:00 UTC 1999","avatarUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/LnAJcNrE-2019-07-29-155544295.JPG?generation=1564415746604603&alt=media"},"bioText":"Hoang Bao Long","id":"116530939333556981755","username":"Long Hoang"},"likedUserIds":["118390528968028844749","116530939333556981755"],"location":{"latitude":20.118678799953962,"placeId":"ChIJd7kW4e2-NjERDtJiPLk09BY","longitude":105.3229031984863},"descriptionText":"<p>Just test new upload <u>UI<\/u><\/p>","id":"800edf5a-9214-41d5-a51f-17b521ad41a0","postImages":[{"imageUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/QIs3xXVt-2019-07-28-173557276.jpg?generation=1564335358687140&alt=media"},"imageDescription":"Just","postId":"800edf5a-9214-41d5-a51f-17b521ad41a0","id":"c36f2331-7481-40ce-b0f4-a0fea8b4e840","orderInPost":0},{"imageUrl":{"value":"https://www.googleapis.com/download/storage/v1/b/image_file_bucket/o/DAeOBIre-2019-07-28-173558711.jpg?generation=1564335358892749&alt=media"},"imageDescription":"Test","postId":"800edf5a-9214-41d5-a51f-17b521ad41a0","id":"1bf48d72-fa32-4dd7-b562-0f3ee3e163b2","orderInPost":1}],"tags":[{"id":"8b69f616-4b21-481b-afa1-73469d0c6a98","tagName":"Night"},{"id":"81606094-4113-410c-a9b9-e46eb9cbae4d","tagName":"Metropolitan_area"},{"id":"fb8006e1-37a5-4995-a1bd-cddc7bf708ea","tagName":"Cityscape"},{"id":"24096fb8-8dc8-4136-a161-0a41f5c6a1ac","tagName":"Anime"},{"id":"74df92db-0c5f-4f7b-ae73-53486d4ae7bb","tagName":"Cartoon"}]}]}

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