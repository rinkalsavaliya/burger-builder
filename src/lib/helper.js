export const isErrorInInput = (value, validation, label) => {
  if (validation.required && !value) {
    return `${label} is a required field`;
  }
  if (validation.minLength && value.toString().trim().length < validation.minLength) {
    return `${label} must have minimum length of ${validation.minLength}`;
  }
  if (validation.maxLength && value.toString().trim().length > validation.maxLength) {
    return `${label} must have maximum length of ${validation.maxLength}`;
  }
  return '';
}

export const setAuth = (authData) => {
  localStorage.setItem('token', authData.idToken);
  localStorage.setItem('userId', authData.localId);
  const expirationTimestamp = new Date().getTime() + parseInt(authData.expiresIn * 1000);
  localStorage.setItem('expirationTimestamp', expirationTimestamp);
}

export const removeAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTimestamp');
  localStorage.removeItem('userId');
}

export const getToken = (token) => {
  return localStorage.getItem('token');
}

export const getUserId = (token) => {
  return localStorage.getItem('userId');
}

export const getExpirationTime = (token) => {
  return localStorage.getItem('expirationTimestamp');
}

export const getTokenEncodedUrl = (url) => {
  return `${url}?auth=${getToken()}`
}
