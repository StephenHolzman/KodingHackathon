var Twitter = require('twitter');
var fs = require('fs');


var keys = JSON.parse(fs.readFileSync('./keys.json', 'utf8'));
console.log(keys);

var clinton = {
    url: "https://twitter.com/HillaryClinton",
    annouce: "April 10, 2015",
    handle: "@HillaryClinton",
    annoucementID: "587336319321407488"
}

var cruz = {
    url: "https://twitter.com/tedcruz",
    annouce: "23 Mar 2015",
    handle: "@tedcruz",
    annoucementID: "579857596191899648"
}

var trump = {
    url: "https://twitter.com/realdonaldtrump",
    annouce: "23 Mar 2015",
    handle: "@realdonaldtrump",
    annoucementID: "610888547839672321"
}

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

// clinton
// client.get('search/tweets', {q: clinton.handle, result_type: 'popular', since_id: clinton.annoucementID, count: 100}, function(error, tweets, response){
//     fs.writeFile('./data/clinton.json', JSON.stringify(tweets, null, 4), function (err) {
//         if (err) return console.log(err);
//     });
// });

// cruz
// client.get('search/tweets', {q: cruz.handle, result_type: 'popular', since_id: cruz.annoucementID, count: 100}, function(error, tweets, response){
//     fs.writeFile('./data/cruz.json', JSON.stringify(tweets, null, 4), function (err) {
//         if (err) return console.log(err);
//     });
// });

// trump
client.get('search/tweets', {q: trump.handle, result_type: 'popular', since_id: trump.annoucementID, count: 100}, function(error, tweets, response){
    fs.writeFile('./data/trump.json', JSON.stringify(tweets, null, 4), function (err) {
        if (err) return console.log(err);
    });
});
