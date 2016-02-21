var getTweet = function(candidate, date) {
    var selDate = new Date(date);

    $.get( "/data/"+ candidate + '/' + candidate +".json", function( data ) {
        var tweets = data;
        // $("#tweet-wrapper").innerhtml('');
        tweets.map(function(tweet) {
           var tweetDate = new Date(tweet.date);
           if (selDate.getDay() == tweetDate.getDay() && selDate.getFullYear() == tweetDate.getFullYear() && selDate.getMonth() == tweetDate.getMonth()) {
               $("#tweet-wrapper").append("<p>" + tweet.text +"</p>")
           }
        });     
    });
};


getTweet("clinton", '1/6/2016');