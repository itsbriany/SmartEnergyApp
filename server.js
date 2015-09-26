var express = require('express');
//var mongojs = require('mongojs');
//var mongoose = require('mongoose');
//var body_paraser = require('body-parser');

var port = 8000;

var app = express();
//var db = mongojs('contactlist', ['contactlist']);

// Connect to MongoDB
//mongoose.connect('mongodb://localhost/contactlist');

// Define the schema
//var ContactSchema = mongoose.Schema({name: String, email: String, number: Number});
//var ContactSchema = mongoose.Schema({name: String});
//
//
//var Contact = mongoose.model('contact', ContactSchema);
//var myContact = new Contact({name: 'another_contact'});
//myContact.save(function(err, myContact) {
//    if (err) return console.log(err);
//});


app.use(express.static(__dirname + "/app"));

//app.get('/SmartEnergyApp', function(req, res) {
//
//});


app.listen(port);
console.log('Listening on port ' + port);