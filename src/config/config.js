const config = {
  apiUrl: 'https://burger-builder-39e38.firebaseio.com'
};
if (process.env.NODE_ENV === 'production') {
  window.console.log = () => { };
}
console.log(process.env, config);
const apiKey = '';
export {
  config,
  apiKey
};
