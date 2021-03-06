/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {

  var pluck = new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(error, content) {
      if (error) {
        reject(error);
      } else {
        resolve(content.split('\n')[0]);
      }
    });
  });
  return pluck;

  // callback occurs with .then on pluckFirstLineFromFile (promise.then(function()))
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {

  var getStatus = new Promise(function(resolve, reject) {
    request(url, function(error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response.statusCode);
      }
    });
  });
  return getStatus;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
