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
