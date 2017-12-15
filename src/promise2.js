const http = require('http');
const constants = require('./constants');

const httpGet = (url) => {
  // note: all this function does is return a promise to caller
  return new Promise((resolve, reject) => {
    http.get(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk
      });
      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', err => {
      reject('Error: ' + err.message);
    });
  })
};

httpGet(constants.GOOD_URL).then(
  data => console.log(data),
  err => console.log(err));
