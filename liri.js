require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const request = require('request');
const API = process.env.OMDB_KEY;
const fs = require('fs');



 
 
getMyTweets = function(){
  console.log("This is my tweets.....");
}

var getArtistNames = function(artist) {
    return artist.name;
}
 
var spotifySong = function(songName){
 
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    console.log('Error occurred: ' + err);
    return;
  }
 
var songs = data.tracks.items;
for(var i = 0; i<songs.length; i++) {
    console.log(i);
    console.log("artist(s): " + songs[i].artists.map(
        getArtistNames));
    console.log("song name: " + songs[i].name);
    console.log("preview song: "+ songs[i].preview_url);
    console.log("album: "+songs[i].album.name);
    console.log("========================================")
    
      } 
   });
}

var getMeMovies = function(movieName){

request('http://www.omdbapi.com/?apikey='+API+'&t='+movieName, function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  
  var jsonData = JSON.parse(body);
  
  console.log('===============================');
  console.log('Title: ' + jsonData.Title);
  console.log('Year: ' + jsonData.Year);
  console.log('Rated: ' + jsonData.Rated);
  console.log('IMBD Rating: ' + jsonData.imbdRating);
  console.log('Country: ' + jsonData.Country);
  console.log('Language: ' + jsonData.Language);
  console.log('Plot: ' + jsonData.Plot);
  console.log('Actors: ' + jsonData.Actors);
  console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
  console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
  console.log('===================================');


   });
}


var doWhatItSays = function(){

            fs.readFile('random.txt', 'utf8' , (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            
            var dataArr = data.split(',');

            if (dataArr.length == 2) {
              pick(dataArr[0], dataArr[1]);
            }
            else if (dataArr.length == 1) {
              pick(dataArr[0]);
            }
              });

}

function pick(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      getMyTweets();
      break;
    case 'spotify-this-song':
      spotifySong(functionData);
      break;
    case 'movie-this':
      getMeMovies(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI does not know that');
  }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);