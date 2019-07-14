export const addParamToUrl = (url, param, paramValue) => {
  const sParam = String(param);
  if (sParam.indexOf('?') === -1) {
    return url + '?' + sParam + '=' + paramValue;
  }
  return url + '&' + sParam + '=' + paramValue;
}