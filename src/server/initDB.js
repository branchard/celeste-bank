var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

let nameDB = 'celestebank';
let collection = 'search';

MongoClient.connect(url+'/'+nameDB, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db(nameDB);
  dbo.createCollection(collection, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 