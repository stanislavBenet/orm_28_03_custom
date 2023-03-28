const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const config = require("../config/db.json");
//const Thing = require("./thing");

const currentFileName = path.basename(__filename);
const dbConfig = config[process.env.NODE_ENV || "development"];
const client = new Client(dbConfig);

//Thing.client = client;

const db = {
  client,
  //Thing,
};

client.connect();

process.on("beforeExit", () => {
  client.end();
});

fs.readdirSync(__dirname)
  .filter((fileName) => fileName!== currentFileName && /\.js$/.test(fileName))
  .forEach((fileName) => {
    const absPath = path.resolve(__dirname, fileName);
    const Model = require(absPath); //const Thing = require("./thing");
    Model.client = client; //Thing.client = client;
    db[Model.name] = Model; //Thing in db
  });

module.exports = db;
