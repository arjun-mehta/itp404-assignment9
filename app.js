var express = require('express')
var app = express()
var topStories = require('./hn.js')


app.get('/', function (req, res) {
	   topStories(function(stories) {
      		res.send(stories);
	   });
});

app.listen(3000, function () {
      console.log('Hacker News Aggregator running at 3000!')
});
