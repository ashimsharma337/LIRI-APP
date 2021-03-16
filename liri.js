require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
 
 
getMyTweets = function(){
  console.log("This is my tweets.....");
}
 
var spotifySong = function(songName){
 
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    console.log('Error occurred: ' + err);
    return;
  }
 
console.log(data.tracks.items[0]); 
});
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song' :
            spotifySong(functionData);
            break;
        default:
        console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);