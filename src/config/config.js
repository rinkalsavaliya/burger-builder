const config = {
  apiUrl: process.env.REACT_APP_API_URL
};
if (process.env.NODE_ENV === 'production') {
  // window.console.log = () => { };
}
console.log(process.env, config);
const apiKey = process.env.REACT_APP_API_KEY;
export {
  config,
  apiKey
};
