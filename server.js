var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');

var port = 8000;

var app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

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
        Installation_type: String,
        Age_Of_Home: String,
        Size_Of_Home: String,
        Water_Consumption: String,
        Electricity_Consumption: String
    }
);

var SmartEnergyData = mongoose.model('SmartEnergyData', SmartEnergyDataSchema);


//var myData = new SmartEnergyData({
//    id: 9000,
//    Customer_Number: "My Number",
//    WEL_Address: "My WEL_Address",
//    Postal_Code: "My Postal Code",
//    Conventional_System: "My Conventional System",
//        Solar_System: "Solar System",
//    Roof_Pitch: "My Roof Pitch",
//    Azimuth: "My Azimuth",
//    Installation_type: "My Installation Type",
//    Age_Of_Home: "My Age of Home",
//    Size_Of_Home: "My Size of Home",
//    Water_Consumption: "My Water Consumption",
//    Electricity_Consumption: "My Electricity Consumption"
//});
//
//myData.save(function(err, myData) {
//    if (err) return console.log(err);
//});


app.use(express.static(__dirname + "/app"));

/*
    Returns all data from the db
 */
app.get('/SmartEnergyData', function(req, res) {
    console.log("Success!");
    SmartEnergyData.find(function(err, dataset) {
        console.log("Sending dataset!");
        res.send(dataset);
    }).limit(10);
});

/*
    Queries for houses in db
 */
app.post('/Houses/', function(req, res) {
    var wel_address_data = req.body.WEL_Address;
    var re = new RegExp(wel_address_data, 'i');
    console.log(wel_address_data);

    SmartEnergyData.find({WEL_Address: {$regex: re}}, function(err, results) {
        console.log("Sending houses!");
        res.send(results);
    });
});


app.listen(port);
console.log('Listening on port ' + port);