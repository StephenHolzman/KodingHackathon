var Twitter = require('twitter');
var fs = require('fs');


var keys = JSON.parse(fs.readFileSync('./keys.json', 'utf8'));
console.log(keys);

var campaignUrls = {
    clinton: "https://twitter.com/HillaryClinton"
};


 
// var client = new Twitter({
//   consumer_key: 'AXuoO0ltYyomCNWKtmefIbiG1',
//   consumer_secret: 'ca6cn3NYRizju19HOz0PbiMjvg2hKXuLMHO1WeJhmwgNySerHC',
//   access_token_key: '578152915-ZJdqyBsbHpheU3QIxEP94zqmOzztvjr1dEEC49sO',
//   access_token_secret: 'oiHyHz4D1eMKmnJUYKJpDsmf4Dc0BXG4B7qtIeGJFbaYR'
// });
// 
// 
// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
//    console.log(tweets);
// });