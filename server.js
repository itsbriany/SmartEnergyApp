var express = require('express');
var mongoose = require('mongoose');
//var body_paraser = require('body-parser');

var port = 8000;

var app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/SmartEnergy');

// Define the schema
var SmartEnergyDataSchema = mongoose.Schema(
    {
        id: Number,
        Customer_Number: Number,
        WEL_Address: String,
        Postal_Code: String,
        Conventional_System: String, // This can potentially be an Object
        Solar_System: String,
        Roof_Pitch: Number,
        Azimuth: Number,
        Installation_Type: String,
        Age_Of_Home: Number,
        Size_Of_Home: Number,
        Water_Consumption: Number,
        Electricity_Consumption: Number
    }
);

var SmartEnergyData = mongoose.model('SmartEnergyData', SmartEnergyDataSchema);

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