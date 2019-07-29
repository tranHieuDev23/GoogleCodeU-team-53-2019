import Axios from "axios";
import { API_EDIT_PROFILE } from "constants/links";
import { notification } from "antd";

export const changeProfile = async (userData) => {
  let result = false;
  const data = new FormData();
  data.append('username', userData.username);
  data.append('birthdate', userData.birthDate);
  data.append('bioText', userData.bioText);
  if (userData.newAvatar !== null)
    data.append('avatar', userData.newAvatar);
  await Axios.post(API_EDIT_PROFILE, data, {})
    .then(() => {
      notification.success({
        'message': 'Success',
        'description': 'Your profile have been updated'
      })
      result = true; 
    }).catch(() => {
      notification.error({
        'message': 'Sorry',
        'description': 'Something was wrong. Please try again'
      })
    })
  return result;
}