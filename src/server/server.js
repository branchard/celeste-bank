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

const api_key = "ce105037d51265348b9d78cd37e0ff7b";

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
        }, q_search);

      }
      else {
        console.log ("Données déja en base");
        res.send (result.response);
      }
    });
  });
});

app.get('/owner', function(req, res){
    let q = url.parse(req.url, true).search;
    let query_parse = q.substr(1);
    let url_request = adress_api_flickr+'?method='+flickr_method_people_getPhoto+'&'+'api_key='+api_key+'&'+query_parse+'&format=json&nojsoncallback=1';
    request.get(
        {
          url: url_request,
        },
        function (err, httpResponse, body) {
          res.send(body);
        }
      );
});

app.use(express.static(path.join(__dirname, '../../public/')));

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(3000);
console.log('Listening 0.0.0.0:3000');

function responseFlickr (callback, query) {
  //On supprimme le premier caractere de la query
  query_parse = query.substr(1);
  let url = adress_api_flickr+'?method='+flickr_method_photo_search+'&'+'api_key='+api_key+'&'+query_parse+'&format=json&nojsoncallback=1';
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
