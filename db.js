const { Connection } = require("tedious");
const dbConfig = require('./db.config.js');

const connection = new Connection(dbConfig);

connection.on("connect", (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    }
    console.log("Successfully connected to the database.");
});

connection.connect();

module.exports = connection;