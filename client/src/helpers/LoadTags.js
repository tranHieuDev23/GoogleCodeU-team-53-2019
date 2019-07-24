import { RETRIEVE_TAG } from 'constants/links';
import axios from 'axios';
import { notification } from 'antd';

export const fetchTags = async data => {
  let tags = null;
  const url = RETRIEVE_TAG;
  await axios
    .post(url, data, {})
    .then(respone => {
      const { data } = respone;
      tags = data.tags;
    })
    .catch(() => {
      notification.error({
        message: 'Can not load suggestion tags',
        description: 'Please check your connection and load again'
      });
    });
  return tags;
};
