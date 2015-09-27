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

ObjectId  = mongoose.Types.ObjectId;


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
    Queries for dataset in db
 */
app.post('/Houses/', function(req, res) {
    var wel_address_data = req.body.WEL_Address;
    var re = new RegExp(wel_address_data, 'i');
    console.log(wel_address_data);

    SmartEnergyData.find({WEL_Address: {$regex: re}}, function(err, results) {
        console.log("Sending dataset!");
        res.send(results);
    });
});

app.put('/MonitorHouse/:id', function(req, res) {
    var id = req.params.id;
    SmartEnergyData.findOne({_id: id}, function(err, results) {
        console.log("Results are: " + results);
        if(results.Water_Consumption == null || results.Electricity_Consumption == null)
            De_normalize_data(results, id);
        else
        normalize_data(results, id);
        res.send(results);
    })
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
    Updates the DB with normalized data

    Params: old_data: the document from the previous search query
            id: the document's object identifier
 */

function normalize_data(old_data, id) {
    console.log("Normalizing data");
    var new_water_consumption = getRandomInt(-10, 10) + parseInt(old_data.Water_Consumption);
    var new_electronic_consumption = getRandomInt(-679, 679) + parseInt(old_data.Electricity_Consumption);
    var replace_data = {Water_Consumption: new_water_consumption.toString(), Electricity_Consumption: new_electronic_consumption.toString()};
    SmartEnergyData.update({_id: id}, replace_data, function(err, doc) {
        console.log("The updated document is: " + doc);
    });
}

/*
    Dealing with invalid values
 */

function De_normalize_data(old_data, id) {
    console.log("De_Normalizing data");
    var new_water_consumption = getRandomInt(100, 200);
    var new_electronic_consumption = getRandomInt(5000, 22000);
    var replace_data = {Water_Consumption: new_water_consumption.toString(), Electricity_Consumption: new_electronic_consumption.toString()};
    SmartEnergyData.update({_id: id}, replace_data, function(err, doc) {
        console.log("The updated document is: " + doc);
    })
}




app.listen(port);
console.log('Listening on port ' + port);