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
        id: String,
        Customer_Number: String,
        WEL_Address: String,
        Postal_Code: String,
        Conventional_System: String, // This can potentially be an Object
        Solar_System: String,
        Roof_Pitch: String,
        Azimuth: String,
        Installation_Type: String,
        Age_Of_Home: String,
        Size_Of_Home: String,
        Water_Consumption: String,
        Electricity_Consumption: String
    }
);

var SmartEnergyData = mongoose.model('SmartEnergyData', SmartEnergyDataSchema);


//var myContact = new Contact({name: 'another_contact'});
//myContact.save(function(err, myContact) {
//    if (err) return console.log(err);
//});


app.use(express.static(__dirname + "/app"));

app.get('/SmartEnergyData', function(req, res) {
    console.log("Success!");
    SmartEnergyData.find(function(err, dataset) {
        console.log(dataset);
    });
});


app.listen(port);
console.log('Listening on port ' + port);