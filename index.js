let MongoClient = require("mongodb").MongoClient;
let json2xls = require("json2xls");
let fs = require("fs");
let assert = require("assert");
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'enginair';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const regCol = db.collection("registration");
    const engCol = db.collection("engines");
    engCol.find({MODEL: { $regex: /(AS907|HTF7000|HTF7250G|HTF7350|HTF7500E|HTF7700L)/}})
        .toArray(function (err, egDocs) {
        let codes = [];
        egDocs.forEach(function(item) {
            codes.push(item["CODE"]);
        });
        regCol.find( { "ENG MFR MDL": {$in: codes}}).toArray(function (err, reDocs) {
            let xls = json2xls(reDocs);
            fs.writeFileSync("./output.xlsx", xls, 'binary');
            client.close();
        });
    });
    //client.close();
});