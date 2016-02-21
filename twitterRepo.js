

var getTweet = function(candidate, date) {
    
    var d = "";
   

    var rep = "republicans";
    var dem = "democrats";
    $("#tweet-wrapper").html("")
    var selDate = new Date(d);
    console.log(selDate, 'helo');
    
    
    var candidates = []
    if (current_party == rep) {
        candidates = ["trump", "cruz", "rubio"]
    } else {
        candidates = ["sanders", "clinton"]
    }
    
    // get tweets for a candidate from json
    var tweets_to_display = getTweetsForSelectedDate(candidates, selDate);    
};

function filterForHighestRT(tweets, n) {
    function compare(a,b) {
        if (a.rt_count < b.rt_count)
            return -1;
        else if (a.rt_count > b.rt_count)
            return 1;
        else 
            return 0;
    }   

    tweets.sort(compare);
    return tweets.splice(0, n);
}

function displayTweets(tweets) {
    tweets.map(function(tweet) {
        $("#tweet-wrapper").append("<p>" + tweet.text + " -" + tweet.source + "</p>")
    })
}

function filterForRedundantTweets(tweets_to_display) {
    var tweets = [];
    tweets.push(tweets_to_display[0]);
    tweets_to_display.splice(0,1);

    tweets_to_display.map(function(tweet) {
        var original = true;
        tweets.map(function(org_tweet) {
           if  (org_tweet.text == tweet.text) {
               original = false;
           }
        });
        
        if (original)
            tweets.push(tweet);
    });
    
    displayTweets(filterForHighestRT(tweets, 2));
}

function getTweetsForSelectedDate(candidates, selDate) {
    var t = [];
    candidates.forEach(function(candidate) {
        $.get( "/data/"+ candidate + '/' + candidate +".json", function( data ) {
            // collect tweets with the selected month
            data.forEach(function(tweet) {
                var tweetDate = new Date(tweet.date);
                // just look at month and year now
                if( selDate.getFullYear() == tweetDate.getFullYear() &&  selDate.getMonth() == tweetDate.getMonth()) 
                    t.push(tweet);
            });  
            filterForRedundantTweets(t);
        });
    });
}

// getTweet("clinton", '1/6/2016');