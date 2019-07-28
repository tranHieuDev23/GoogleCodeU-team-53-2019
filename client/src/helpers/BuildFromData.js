
import { notification } from 'antd';
import { SUGGEST_NO_IMAGE } from 'constants/Notification.js';
import { tagSanitization } from 'helpers/TagValidate';

export const BuildFormDataToGetTag = (images) => {
  const data = new FormData();
  let count = 0;
  for (let i = 0; i < images.length; i++)
    if (images[i] != null) count++;
  if (count === 0) {
    notification.error(SUGGEST_NO_IMAGE);
  } else {
    data.append('numberOfImages', count);
    let cnt = 0;
    images.forEach(image => {
      if (image != null) {
        data.append('file-' + cnt, image);
        ++cnt;
      }
    });
    return data;
  }
  return null;
}

export const BuildFormDataToUpload = (detail) => {
  const { images, description, tags, location, imageDescriptions } = detail;

  const descriptions = [];
  const len = imageDescriptions.length;
  images.forEach((image, index) => {
    if (image !== null) {
      if (index < len) {
        descriptions.push(imageDescriptions[index]);
      }
      else descriptions.push('');
    }
  });

  const data = new FormData();
  const obj = {
    descriptionText: description,
    imageDescriptions: descriptions,
    tags: tagSanitization(tags),
    location: location
  };

  data.append('postDetails', JSON.stringify(obj));
  let cnt = 0;
  images.forEach(image => {
    if (image !== null) {
      data.append('file-' + cnt, image);
      ++cnt;
    }
  });
  return data;
}