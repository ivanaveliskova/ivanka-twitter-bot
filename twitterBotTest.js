var Twit        = require('twit');
var async       = require('async');
var path        = require('path');
var fs          = require('fs');

// Gets the 
var words = path.join(__dirname, './data/words.json');
// var wordFilter  = require('wordfilter');

// Function for finding the diff between 2 arrays
// Will be super useful for finding new people to follow. Thank you StackOverflow
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

// This calculates the ms used in setInterval from the number of hours set
var hoursToMs = function(hours) {
    return hours * 60 * 60 * 1000;
}


if (!process.env.CONSUMER_KEY) {
    var env = require('./env.js')
}

// Include your access information below, keep it secret, shhhh!
var secret = {
    "consumer_key": process.env.CONSUMER_KEY,
    "consumer_secret": process.env.CONSUMER_SECRET,
    "access_token": process.env.ACCESS_TOKEN_KEY,
    "access_token_secret": process.env.ACCESS_TOKEN_SECRET
};


// Creates a new instance of twitter to allow for posting and getting info.
var Tweet = new Twit(secret);

// var wordnikKey = process.env.WORDNIK_API_KEY;

//////////////////////////////////////////////////////////////////
// This code definitely works                                   //
// and is in the main file                                      //
//////////////////////////////////////////////////////////////////
// This should be tracking/listening for when things occur and then do something with that data.
// var stream = Tweet.stream('statuses/filter', { track: '@ivankabot' })

// stream.on('tweet', function (tweet) {

//     var username = '@' + tweet.user.screen_name,
//         tweetText = tweet.text,
//         regexHello = /hello/i,
//         regexHi = /hi/i,
//         regexHey = /hey/i;

//     // This only will respond if there is some form of hello that was said, sorry only 3 options for now
//     if (tweetText.match(regexHello) || tweetText.match(regexHey) || tweetText.match(regexHi)) {
//         // This will read the json file and get random greeting phrases
//         fs.readFile(words, 'utf-8', function (err, data) {
//             if (err) throw err;

//             var greetingsData = JSON.parse(data).greetings,
//                 greetingsCount = greetingsData.length,
//                 randNum = Math.floor(Math.random() * greetingsCount),
//                 randomGreeting = greetingsData[randNum],
//                 concactenatedGreeting = randomGreeting + ", " + username;

//             Tweet.post('statuses/update', { status: concactenatedGreeting}, function(error, tweet, response) {
//                 if (error) {
//                     console.log(error);
//                 }
//             });
//         });
        
//     }


// });

//////////////////////////////////////////////////////////////////////
// End working                                                      //
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// This is working and follows random people every 24hours!         //
// Already in the main file                                         //
//////////////////////////////////////////////////////////////////////

// var followHowOften = hoursToMs(24);

// setInterval(function() {
//     Tweet.get('friends/ids', {screen_name: 'ivanaveliskova'}, function(err, data, response) {
//         if(!err) {
//             var ivanaFollows = data.ids;

//             Tweet.get('friends/ids', {screen_name: 'IvankaBot'}, function(error, newData, res) {
//                 if (!err) {
//                     var botFollows = newData.ids;
//                     Tweet.get('users/show', {screen_name: 'IvankaBot'}, function(errors, botData, responses) {
//                         if (errors) {
//                             console.log(errors);
//                         }
//                         var botID = botData.id;

//                         botFollows.push(botID);

//                         var difference = ivanaFollows.diff(botFollows);

//                         var randomNum = Math.floor(Math.random() * difference.length);

//                         var randomUser = difference[randomNum];
//                         Tweet.post('friendships/create', { user_id: randomUser}, function(errorMore, successFollow, respond) {
//                             if (errorMore) {
//                                 console.log(errorMore);
//                             }
//                         });
                        
//                     });
//                 } else {
//                     console.log(error);
//                 }
//             })

//         } else {
//             console.log(err);
//         }
//     });
// }, followHowOften);

//////////////////////////////////////////////////////////////////////
// end working                                                      //
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Retweets current job opening for front end developer             //
//////////////////////////////////////////////////////////////////////

// var retweetJob = hoursToMs(10);

// setInterval(function() {
//     Tweet.get('search/tweets', { q: 'front end developer', result_type: 'recent', count: '1'}, function(err, data, res) {
//         if (err) {
//             console.log(err);
//         } else {
//             var tweetID = data.statuses[0].id_str;
//             Tweet.post('statuses/retweet/:id', { id: tweetID }, function(error, dataNew, response) {
//                 if (error) {
//                     console.log(error);
//                 }
//             });
//         }
//     });
// }, retweetJob);

//////////////////////////////////////////////////////////////////////
// End working                                                      //
//////////////////////////////////////////////////////////////////////





// Tweet.post('statuses/update', {status: 'This is a test! :-)'},  function(error, tweet, response){
//   if(error){
//     console.log(error);
//   }
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });

// Create a random query, probably from an array of prechosen queries related to something that I wish to retweet (JS, HTML, CSS, etc)
// var query = "callbackwomen";

// Tweet.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
//     // Gets the id of the tweet to be retweeted
//     console.log(data);
//     console.log(data.statuses[0].id);

//     // Allows to retweet 
//     // T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, data, response) {
//     //     console.log(data)
//     // })
// });


// This was a test to see if one can have a listener and a regular post working at the same time
// SUCCESS!

// setTimeout(function() {
//     Tweet.post('statuses/update', {status: 'Just a random test to see what happens'},  function(error, tweet, response){
//         if(error){
//             console.log(error);
//         }
//     });
// }, 60000)


// // Sets up the repeating tweet
// setInterval(function() {

// // Creates a random number to determine what random action should be performed
// var randomNumber = Math.floor(Math.random() * 100);
//     if (randomNumber < 25) {
//         // Tweet any random tweet consisted of random words
//         console.log("Less than 25");
//     } else if (randomNumber < 50) {
//         // Start a hashtag
//         console.log("less than 50");
//     } else if (randomNumber < 75) {
//         // Random fact
//         console.log('less than 75');
//     } else {
//         // Retweet a tech user's tweet (maybe if it contains HTML/CSS/or JS?)
//         console.log('less than 100');
//     }
// }, days);



// Tweet.get('application/rate_limit_status', { resources: 'help,users,search,statuses'}, function(err, data, res) {
//     console.log(data);
// });
