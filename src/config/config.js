const config = {
  apiUrl: process.env.API_URL
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
