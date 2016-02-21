

var getTweet = function(candidate, date) {
    var rep = "republicans";
    var dem = "democrats";
    $("#tweet-wrapper").html("")
    var selDate = new Date('1/6/2016');
    
    
    var candidates = []
    if (current_party == rep) {
        candidates = ["trump", "cruz", "rubio"]
    } else {
        candidates = ["sanders", "clinton"]
    }
    
    // get tweets for a candidate from json
    getTweetsForSelectedDate(candidates, selDate);


    // remove redudent tweets
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
    
    
    // add tweets to view
    
    // tweets.map(function(tweet) {
    //     $("#tweet-wrapper").append("<p>" + tweet.text +"</p>")
    // })
    
};


function displayTweets(tweets) {
    
}

function filterForRedundantTweets(tweets) {
    
}

function getTweetsForSelectedDate(candidates, selDate) {
    var tweets_to_display = [];
    candidates.map(function(candidate) {
        $.get( "/data/"+ candidate + '/' + candidate +".json", function( data ) {
            
            var tweets = data;
            
            // collect tweets with the selected month
            tweets.map(function(tweet) {
                var tweetDate = new Date(tweet.date);
                // just look at month and year now
                if (selDate.getFullYear() == tweetDate.getFullYear() && selDate.getMonth() == tweetDate.getMonth()) {
                    tweets_to_display.push(tweet);
                    console.log(tweets_to_display)
                }
            });  
        });
    });
    return tweets_to_display;
}
// listen for click on  a month or party

getTweet("clinton", '1/6/2016');