var filePath = './images/';
var fs = require('fs');
var request = require('request');
var secret = require('./secrets');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'secret.GITHUB_TOKEN'
    }
  };
  
  request(options, function(err, res, body) {
      cb(err, JSON.parse(body));
      
  }); 
  }

  
function downloadImageByURL(url, filePath) {

  request.get(url).pipe(fs.createWriteStream(filePath));   
}

  getRepoContributors('jquery', 'jquery', function(err, result) {
    result.forEach(function(element) {
    downloadImageByURL(element.avatar_url, element.login);
    console.log('element', element.login);
    console.log('login', element.login);
    // console.log(element.avatar_url);
})
  })