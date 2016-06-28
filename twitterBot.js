var Twit        = require('twit');
var path        = require('path');
var fs          = require('fs');

// Gets the words json data for different words/phrases
var words = path.join(__dirname, './data/words.json');


// Function for finding the diff between 2 arrays
// Will be super useful for finding new people to follow. Thank you StackOverflow
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

// This calculates the ms used in setInterval from the number of hours set
var hoursToMs = function(hours) {
    return hours * 60 * 60 * 1000;
};

if (!process.env.CONSUMER_KEY) {
    var env = require('./env.js');
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




// This should be tracking/listening for when things occur and then do something with that data.

var stream = Tweet.stream('statuses/filter', { track: '@ivankabot' });

stream.on('tweet', function (tweet) {

    var username = '@' + tweet.user.screen_name,
        tweetText = tweet.text,
        regexHello = /hello/i,
        regexHi = /hi/i,
        regexHey = /hey/i;

    // This only will respond if there is some form of hello that was said, sorry only 3 options for now
    if (tweetText.match(regexHello) || tweetText.match(regexHey) || tweetText.match(regexHi)) {
        // This will read the json file and get random greeting phrases
        fs.readFile(words, 'utf-8', function (err, data) {
            if (err) throw err;

            var greetingsData = JSON.parse(data).greetings,
                greetingsCount = greetingsData.length,
                randNum = Math.floor(Math.random() * greetingsCount),
                randomGreeting = greetingsData[randNum],
                concactenatedGreeting = randomGreeting + ", " + username;

            Tweet.post('statuses/update', { status: concactenatedGreeting}, function(error, tweet, response) {
                if (error) {
                    console.log(error);
                }
            });
        }); 
    }
});


var followHowOften = hoursToMs(20);

setInterval(function() {
    Tweet.get('friends/ids', {screen_name: 'ivanaveliskova'}, function(err, data, response) {
        if(!err) {
            var ivanaFollows = data.ids;

            Tweet.get('friends/ids', {screen_name: 'IvankaBot'}, function(error, newData, res) {
                if (!err) {
                    var botFollows = newData.ids;
                    Tweet.get('users/show', {screen_name: 'IvankaBot'}, function(errors, botData, responses) {
                        if (errors) {
                            console.log(errors);
                        }
                        var botID = botData.id;

                        botFollows.push(botID);

                        var difference = ivanaFollows.diff(botFollows);

                        var randomNum = Math.floor(Math.random() * difference.length);

                        var randomUser = difference[randomNum];
                        Tweet.post('friendships/create', { user_id: randomUser}, function(errorMore, successFollow, respond) {
                            if (errorMore) {
                                console.log(errorMore);
                            }
                        });
                        
                    });
                } else {
                    console.log(error);
                }
            });

        } else {
            console.log(err);
        }
    });
}, followHowOften);


var retweetJob = hoursToMs(10);

setInterval(function() {
    Tweet.get('search/tweets', { q: 'front end developer', result_type: 'recent', count: '1'}, function(err, data, res) {
        if (err) {
            console.log(err);
        } else {
            var tweetID = data.statuses[0].id_str;
            Tweet.post('statuses/retweet/:id', { id: tweetID }, function(error, dataNew, response) {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
}, retweetJob);
