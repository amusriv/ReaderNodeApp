/*	This is boss server. The code defines routes (relative url routes) and how requests to those 
:/app
	routes are handled. I'm using mongoose for db access (native mongoclient is such a pain!). The 
	UI simply needs to make get calls to /read /listen /watch and expect a string (url to go to)in return 
	:)
*/
var express = require("express");
var app = express();
var mongoose = require('mongoose'),
    db = mongoose.createConnection('localhost', 'test');
db.on('error', console.error.bind(console, 'connection error:'));
//The schemas are redundant, yes, but mongoose needs a separate schema for each collection.
var readSchema = new mongoose.Schema({
    sno: Number,
    link: String
}, {
    collection: "readDB"
});
var readModel = db.model('readModel', readSchema);
var listenSchema = new mongoose.Schema({
    sno: Number,
    link: String
}, {
    collection: "listenDB"
});
var listenModel = db.model('listenModel', listenSchema);
var watchSchema = new mongoose.Schema({
    sno: Number,
    link: String
}, {
    collection: "watchDB"
});
var watchModel = db.model('watchModel', watchSchema);
//app.set("view engine", "html");
//app.set("views", __dirname+"/views/");
app.use(express.static(__dirname + "/views/"));
app.get("/", function(req, res) {
    res.sendfile("./views/Read2.html");
});
app.get("/views/scripts/app.js", function(req, res) {
    res.sendfile("./views/scripts/app.js");
});
app.get("/styles/main.css", function(req, res) {
    res.sendfile("./views/styles/main.css");
});
app.get("/read", function(req, res) {
    var totalLinks = 50; //50 -> safe value
    readModel.count({}, function(err, count) {
        if (err) return err;
        else {
            totalLinks = count;
            console.log("count is: " + count);
        }
    });
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
            var dbresultJSON = data[0];
            console.log("the link is: " + dbresultJSON.link);
            res.send(dbresultJSON.link);
        }
    });
});
app.get("/listen", function(req, res) {
    var totalLinks = 50; //50 -> safe value
    listenModel.count({}, function(err, count) {
        if (err) return err;
        else {
            totalLinks = count;
            console.log("count is: " + count);
        }
    });
    //TODO: find totallinks.
    var offset = req.query.offset;
    var count = req.query.count;
    var index = (offset + count) % totalLinks;
    listenModel.find({
        "sno": index
    }, function(err, data) {
        if (err) {
            throw err;
        } else {
            /*  mongoose.connection.close(); */
            console.log(data[0]);
            var dbresultJSON = data[0];
            console.log("the link is: " + dbresultJSON.link);
            res.send(dbresultJSON.link);
        }
    });
});
app.get("/watch", function(req, res) {
    var totalLinks = 50; //50 -> safe value
    watchModel.count({}, function(err, count) {
        if (err) return err;
        else {
            totalLinks = count;
            console.log("count is: " + count);
        }
    });
    //TODO: find totallinks.
    var offset = req.query.offset;
    var count = req.query.count;
    var index = (offset + count) % totalLinks;
    watchModel.find({
        "sno": index
    }, function(err, data) {
        if (err) {
            throw err;
        } else {
            /*  mongoose.connection.close(); */
            console.log(data[0]);
            var dbresultJSON = data[0];
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
