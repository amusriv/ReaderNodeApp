var express = require("express");
var app = express();
var mongoose = require('mongoose'),  
    db = mongoose.createConnection('localhost', 'test');
db.on('error', console.error.bind(console, 'connection error:'));

var readSchema = new mongoose.Schema({  
  sno: Number,
  link: String
},{collection : "readDB"});

var readModel= db.model('readModel', readSchema); 

//app.set("view engine", "html");
//app.set("views", __dirname+"/views/");
app.use(express.static(__dirname + "/views/"));

app.get("/", function(req, res) {
	res.sendfile("./views/Read.html");
});


app.get("/read", function(req, res){
	
	var totalLinks = 50; //50 -> safe value
	readModel.count({},function(err, count){if (err) return err; else {totalLinks = count; console.log("count is: " + count);}});
	//TODO: find totallinks.
	var offset = req.query.offset;
	var count = req.query.count;
	var index = (offset + count) % totalLinks;
		readModel.find({  
    "sno": index
  }, function(err, data) {
    if (err) {
      throw err;
    } else {
     /*  mongoose.connection.close(); */
      console.log(data[0]);
	  var dbresultJSON= data[0];
	  console.log("the link is: " + dbresultJSON.link);
	  res.send(dbresultJSON.link);
    }
  });
	
});

app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');




/* app.get("/read", function(req, res) {
	var MongoClient = require('mongodb').MongoClient , format = require('util').format;
	
	
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) { if (err) throw err;
	
	console.log("Connected to Database");
	var count = req.query.count;
	var offset = req.query.offset;
	var totalLinks = db.collection("readDB").count();
	console.log("Total links found to be : " + totalLinks);
	var index = (offset + count) % totalLinks;
	console.log("Index found to be : " + index);
	
	var countResult = db.collection("readDB").count();
	countResult.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else console.log("Things are going wrong here.");
	});
	
	//	var link = db.collection("readDB").find( {sno : index});
//	console.log(link);
	//alert(link);
  //simple json record
	
//});

	});
	//MongoClient.close();
}); */
