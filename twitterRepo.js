
// config object
var configure = {
    displayTweets: true,
    displayWC: true,
    displayCloud: false
}

// Get tweets from the repo
var getTweet = function(candidate, date) {   
    var rep = "republicans";
    var dem = "democrats";
    $("#tweet-wrapper").html("");
    $("#common-words").html("");
    $("#word-clouds").html("");
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

// *****************************
// Word Count
// *****************************
// Get n number of highest word counts
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

// filter out some useless words
function isGoodWord(word) {
    word = word.toLowerCase();
    if (word.length <= 2)
       return false;
       
    if (word.indexOf("http") > -1 || word.indexOf("--") > -1 || word.indexOf("-->") > -1)
        return false;
    
    if (word == "the" || word == "for" || word == "but" || word == "and" || word == "are" || word == "that" || word == "retweeted")
        return false;
        
    return true;
}

// get a list of all words
function rawWords(tweets) {
    var raw = [];
    tweets.map(function(tweet) {
        if(tweet) {
            tweet.text.split(' ').map(function(word) {
                if(word && isGoodWord(word)) {
                    raw.push(sanatize(word));
               } 
            });
        }
    });
    return raw;
}
// Remove weird punctionuation
function sanatize(word) {
    return word.replace('!', '').replace('.', '').replace(':', '')
                .replace('?', '').replace(')', '').replace('(', '')
                .replace(',', '').replace('"', '').replace('“', '');
}

// sort the WC
function orderWordCount(wordCount, n) {
    var sortable = [];
    for (var word in wordCount)
        sortable.push([word, wordCount[word]])
    
    var sorted = sortable.sort(function(a, b) {return a[1] - b[1]})
    sorted = sorted.reverse();
    return sorted.splice(0, n);
}

// perform the wc
function countWordsByCandidate(tweets) {
    var mostCommonWords = {};
    tweets.map(function(tweet) {
        if(tweet) {
            tweet.text.split(' ').map(function(word) {
                word = word.toLowerCase();
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

// add wc to page
function displayWordCount(counts, candidate) {
       
        $('#common-words').append("<h3>" + candidate + "</h3>");
        counts.map(function(wordAndCount) {
            $('#common-words').append("<span class='top-words'>" + wordAndCount[0] + ": " + wordAndCount[1] + "</span><br/>");
        })
}   

// *****************************
// Word Clouds
// *****************************
function createWordClouds(tweets) {
    var tweetWords = rawWords(tweets);
    var fill = d3.scale.category20();

    d3.layout.cloud().size([300, 300])
      .words(tweetWords.map(function(d) {
        return {text: d, size: 10 + Math.random() * 50};
      }))
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("#word-clouds").append("svg")
        .attr("width", 300)
        .attr("height", 300)
        .append("g")
        .attr("transform", "translate(150,150)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
}

// *****************************
// Tweets
// *****************************
// add tweets to page
function displayTweets(tweets) {
    tweets.map(function(tweet) {
        if (tweet) {
            $("<blockquote class='twitter-tweet'>"+"<p>" + tweet.text + " -" + tweet.source + "</p>"+"</blockquote>").hide().appendTo("#tweet-wrapper").fadeIn('slow');
        }
    });
    
}

// filter out redendant tweets -- THIS IS WHERE DISPLAY FUNCTIONS ARE CALLED
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
        
        console.log(tweet.source);
        if (original && tweet.source)
            tweets.push(tweet);
    });
    
    
    if (configure.displayWC) 
         displayWordCount(countWordsByCandidate(tweets), candidate);

    if (configure.displayTweets)
        displayTweets(filterForHighestRT(tweets, 2));
        
    return tweets;
}



function getTweetsForSelectedDate(candidates, selDate) {
    var t = [];
    var cumTweets = [];
    
    
    if (configure.displayWC) 
         $('#common-words').append("<h2>Twitter Word Count</h2><hr/>");

    if (configure.displayTweets)
        $("#tweet-wrapper").append("<h2>Popular Tweets</h2><hr/>");
        
    candidates.forEach(function(candidate, idx, array) {
        $.get( "/data/"+ candidate + '/' + candidate +".json", function( data ) {
            // collect tweets with the selected month
            data.forEach(function(tweet) {
                var tweetDate = new Date(tweet.date);
                // just look at month and year now
                if( selDate.getFullYear() == tweetDate.getFullYear() &&  selDate.getMonth() == tweetDate.getMonth()) 
                    t.push(tweet);
            });  
            
            
            filterForRedundantTweets(t, candidate).map(function(tweet) {
                cumTweets.push(tweet);
            });
            
            if (configure.displayCloud) {
                if (idx === array.length - 1){ 
                    createWordClouds(cumTweets);
                }
            }
        });
    });
}