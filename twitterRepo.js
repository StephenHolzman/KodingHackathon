var getTweet = function(candidate, date) {
    console.log('hello');

    $.get( "/api/data/clinton.json", function( data ) {
        console.log(data);
    });
};


getTweet('hello', 'rt');