const config = {
  apiUrl: 'http://localhost:3001/api/v1'
};
if (process.env.NODE_ENV === 'production') {
  config.apiUrl = '/api/v1';
}
export {
  config
};
