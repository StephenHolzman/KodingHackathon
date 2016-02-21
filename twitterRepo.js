

var getTweet = function(candidate, date) {   
    var rep = "republicans";
    var dem = "democrats";
    $("#tweet-wrapper").html("");
    $("#common-words").html("");
    var selDate = new Date(date);

    
    
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

// function orderWordCount(mostCommonWords) {
//     var ordered = {};
//     while (mostCommonWords) {
//         var f = Object.keys(mostCommonWords)[0];
//     }
// }

function isGoodWord(word) {
    word = word.toLowerCase();
    if (word.length <= 2)
       return false;
       
    if (word.indexOf("http") > -1 || word.indexOf("--") > -1 || word.indexOf("-->") > -1)
        return false;
    
    if (word == "the" || word == "for" || word == "but" || word == "and" || word == "are" || word == "that")
        return false;
        
    return true;
}

function sanatize(word) {
    return word.replace('!', '').replace('.', '').replace(':', '')
                .replace('?', '').replace(')', '').replace('(', '')
                .replace(',', '').replace('"', '').replace('“', '');
}

function orderWordCount(wordCount, n) {
    var sortable = [];
    for (var word in wordCount)
        sortable.push([word, wordCount[word]])
    
    var sorted = sortable.sort(function(a, b) {return a[1] - b[1]})
    sorted = sorted.reverse();
    return sorted.splice(0, n);
}

function countWordsByCandidate(tweets) {
    var mostCommonWords = {};
    tweets.map(function(tweet) {
        if(tweet) {
            tweet.text.split(' ').map(function(word) {
                if(word && isGoodWord(word)) {
                    word = sanatize(word);
                    if(word in mostCommonWords) {
                        mostCommonWords[word] = mostCommonWords[word] + 1;
                    } else {
                        mostCommonWords[word] = 1;
                    }
               } 
            });
        }
    });
    return orderWordCount(mostCommonWords, 10);
} 

function displayTweets(tweets) {
    tweets.map(function(tweet) {
        if (tweet) {
            $("<blockquote class='twitter-tweet'>"+"<p>" + tweet.text + " -" + tweet.source + "</p>"+"<blockquote>").hide().appendTo("#tweet-wrapper").fadeIn('slow');
        }
    });
    
}

function displayWordCount(counts, candidate) {
        $('#common-words').append("<h3>" + candidate + "</h3>");
        counts.map(function(wordAndCount) {
            
            $('#common-words').append("<span>" + wordAndCount[0] + ": " + wordAndCount[1] + "</span><br/>");
        })
}

function filterForRedundantTweets(tweets_to_display, candidate) {
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
    
    displayWordCount(countWordsByCandidate(tweets), candidate);
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
            filterForRedundantTweets(t, candidate);
        });
    });
}