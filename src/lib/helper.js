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
  localStorage.setItem('expiresIn', authData.expiresIn);
}

export const removeAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiresIn');
}

export const getToken = (token) => {
  return localStorage.getItem('token');
}

export const getExpirationTime = (token) => {
  return localStorage.getItem('expiresIn');
}

export const getTokenEncodedUrl = (url) => {
  return `${url}?auth=${getToken()}`
}
