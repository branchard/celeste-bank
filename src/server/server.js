let express = require('express');
let request = require('request');

let app = express();
app.use(express.json())

const api_key = "481e8cb178c34445c57e36e31263e3b9";

app.get('/search', function(req, res) {
    request.get(
        {
          url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key='+api_key+'&text=photo&format=json&nojsoncallback=1',
        },
        function (err, httpResponse, body) {
          console.log(err, body);
        }
      );

    res.send('ok');
});

app.get('/owner', function(req, res){
    request.get(
        {
          url: 'https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key='+api_key+'&user_id='+req.param('owner')+'&format=json&nojsoncallback=1',
        },
        function (err, httpResponse, body) {
          console.log(err, body);
        }
      );

    res.send('ok');
});
https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=481e8cb178c34445c57e36e31263e3b9&user_id=29388462%40N06&format=json&nojsoncallback=1
app.listen(3000); 