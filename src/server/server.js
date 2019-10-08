let express = require('express');
let request = require('request');
let url = require('url');
const path = require('path');

let MongoClient = require('mongodb').MongoClient;
let urlMongo = "mongodb://localhost:27017";

let dataBase = 'celestebank';
let collection = 'search';


let app = express();
app.use(express.json())

const api_key = "8ace1d78f867284ec1756b03727c8b7d";

const adress_api_flickr = "https://www.flickr.com/services/rest/";
const flickr_method_photo_search = "flickr.photos.search";
const flickr_method_people_getPhoto = "flickr.people.getPhotos";

app.get('/search', function(req, res) {

  var q = url.parse(req.url, true);

  let q_search = q.search;

  let request_find = {'search' : q_search};
  //let request_find = {};

  //on verifie si la requette est en base
   MongoClient.connect(urlMongo, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dataBase);
    dbo.collection(collection).findOne(request_find, function(err, result) {
      if (err) throw err;
      console.log(result);

      //si la ligne n'est pas en base on l'a créé
      if (result == null){
        responseFlickr (function (response){
          //on envoie la réponse
          res.send (response);

          let request = { search: q_search, response: response };
          dbo.collection(collection).insertOne(request, function(err, res) {
          if (err) {
          console.log("1 document inserted");
          db.close();
          }
        });
        }, '?text=table');

      }
      db.close();
    });
  });
    //let url = adress_api_flickr+'?method='+flickr_method_photo_search+'?'+'api_key='+api_key+''
 /*   request.get(
        {
          url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key='+api_key+'&text=photo&format=json&nojsoncallback=1',
        },
        function (err, httpResponse, body) {
          console.log(err, body);
        }
      );
*/
    //res.send('ok');
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

app.use(express.static(path.join(__dirname, '../../public/')));

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(3000);

MongoClient.connect(urlMongo, function(err, db) {
  if (err) throw err;
  var dbo = db.db("celestebank");
  dbo.collection("search").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

function responseFlickr (callback, query) {
  //On supprimme le premier caractere de la query
  query_parse = query.substr(1);
  let url = adress_api_flickr+'?method='+flickr_method_photo_search+'&'+'api_key='+api_key+'&'+query_parse+'&format=json&nojsoncallback=1';
  console.log(url);
  let response = {};
  request.get(
        {
          url: url,
        },
        function (err, httpResponse, body) {
          callback (body);
        }
  );

  return response;

}



