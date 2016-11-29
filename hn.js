var request = require('request');

function topStories(completion) {

    // Get the ids for the tops stories
    request.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', function(error, resp, body) {
        if (!error && resp.statusCode == 200)
        {
            var completed_requests = 0;
            var responses = [];
            var parsed = JSON.parse(body);
            for(i = 0; i < 10; i++)
            {
                // Get the individual stories from hacker news. This is a non-blocking call
                request.get('https://hacker-news.firebaseio.com/v0/item/'+String(parsed[i])+'.json', function(story_error, story_resp, story_body) {
                    // If we don't have 
                    if (!error)
                    {
                        responses.push(JSON.parse(story_body));
                    }
                    completed_requests++;
                    // Once we've see all the responses for the individual stores, call the callback with all of them. 
                    if (completed_requests == 10)
                    {
                        completion(responses);
                    }
                })
            }
        }
        else
        {
            // Silently fail. Could make the case for providing an error callback
            completion([]);
        }
    });
 }


module.exports = topStories;
