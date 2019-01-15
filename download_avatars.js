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
      var jsonFormat = JSON.parse(body);
      // var finalResult = [];
      cb(err, jsonFormat);
      jsonFormat.forEach(function(element) {
        console.log(element['avatar_url']);
        // if (jsonFormat[element] = 'avatar_url') {
        //   finalResult.push(element['avatar_url']);
        
        }); 
    });
  }

getRepoContributors('jquery', 'jquery', function(err, result) {

  console.log('Errors:', err);
});