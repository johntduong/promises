/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promMod = require('./promisification');
var constMod = require('./promiseConstructor');

// using the below function and invoking it on line 33 does not work
// var writeFile = function(writeFilePath, profile) {
//   var writeFilePromise = new Promise(function(resolve, reject) {
//     fs.writeFile(writeFilePath, JSON.stringify(profile), 'utf8', function(error, content) {
//       if (error) { 
//         reject(error);
//       } else { 
//         resolve(JSON.stringify(profile));
//       }
//     });
//     return writeFilePromise;
//   });
// };

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return constMod.pluckFirstLineFromFileAsync(readFilePath)
  .then(function(username) {
    return promMod.getGitHubProfileAsync(username)
    .then(function(profile) {
      return new Promise(function(resolve, reject) {
        fs.writeFile(writeFilePath, JSON.stringify(profile), 'utf8', function(error, content) {
          if (error) { 
            reject(error);
          } else { 
            resolve(JSON.stringify(profile));
          }
        });
      });
    });
  });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
