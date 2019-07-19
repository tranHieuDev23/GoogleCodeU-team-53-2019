export const addFirstParamToUrl = (url, param, paramValue) => {
  return url + '?' + String(param) + '=' + String(paramValue);
}

export const addParamToUrl = (url, param, paramValue) => {
  return url + '&' + String(param) + '=' + String(paramValue);
}