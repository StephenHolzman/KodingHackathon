import json
from datetime import datetime
import time

candidate = "clinton"

class Tweet:
    def __init__(likes, text, candidate, date):
        self.likes = likes
        self.text = text
        self.candidate = candidate
        self.date = date

bob = []
with open('./clinton_tweets/clinton.txt', 'r') as input:
    bol = []
    for line in input:
        if line.strip() == "##NEW##":
            bob.append(bol)
            bol = []
        bol.append(line.strip())

def validate(date_text):
    print(date_text)
    t = ""
    if len(date_text) == 5 or len(date_text) == 6:
        v = date_text.split(' ')
        date_text = v[1] + ' ' + v[0] + " 2016"
        
        
    try:
        t = datetime.strptime(date_text, '%d %b %Y')
    except:
        t = datetime.now()
        
    return t
    
tweets = []
rt = 0
like = 0
date = 0        
        
for b in bob:	
    tweet = {'candidate': candidate}
    for c in b:
        ch = c.strip()
        if ch == "More":
            tweets.append(tweet)
            break
        
        if rt:
            tweet["rt_count"] = int(ch.replace('K', '000').replace('.', ''))
            rt = 0
        elif like:
            tweet["like_count"] = int(ch.replace('K', '000').replace('.', ''))
            like = 0
        elif date:
            tweet["text"] = ch
            date = 0
        elif ch == "Retweet":
            rt = 1
        elif ch == "Like":
            like = 1
        elif ch.split(" ")[0] == "@HillaryClinton":
            tweet["date"] = datetime.strftime(validate(ch.replace('@HillaryClinton', '').strip()), '%Y-%m-%d')
            date = 1
        
        
    
fo = open("./clinton_tweets/clinton.json", "w+")
fo.write( json.dumps(tweets) )