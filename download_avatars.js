var args = process.argv.slice(2);
var fs = require('fs');
var request = require('request');
var secret = require('./secrets');
console.log('Welcome to the GitHub Avatar Downloader!');

//arguments entered via terminal will populate repoOwner and repoName
//authorization token is located in secret.js
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'secret.GITHUB_TOKEN'
    }
  };
  
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));  //create a readable file to extract from
  }); 
}

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));  // download avatar images to 
}

// call the functions and download the avatars
getRepoContributors(args[0], args[1], function(err, result) {
  if (args[1] == null) {
    console.log('Do not be lazy, add another argument');
  }
  result.forEach(function(element) {

  downloadImageByURL(element.avatar_url, `./avatars/${element.login}`);
  console.log('element', element.login);
  console.log('login', element.login);
  });
});