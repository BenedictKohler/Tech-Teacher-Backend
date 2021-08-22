// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Utils = require('./Utils.js');

// Constants
const PORT = 8000;

const app = express();

app.use(cors());
app.use('/images', express.static('./assets/images'));
app.use('/videos', express.static('./assets/videos'));
app.use(bodyParser.json({limit: '10mb'}));

// Get all posts endpoint
app.get('/posts', (req, res) => {
    let query = 'select * from Post';
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error executing query: " + err.message);
            res.status(500).json({"Error": err.message});
            return;
        }
        else {
          let data = Utils.convertToJsonList(rows);
          res.status(200).json(data);
        }
    });
    connection.execSql(request);
});


// Add a new post endpoint
app.post('/post', (req, res) => {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    let query = 'insert into Post (author, content, dateAdded) values (@author, @content, @dateAdded); select @@identity';
    let params = [{name: 'author', type: TYPES.VarChar, value: req.body.author}, {name: 'content', type: TYPES.VarChar, value: req.body.content},
    {name: 'dateAdded', type: TYPES.Date, value: date}];

    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error executing query: " + err.message);
            res.status(500).json({"Error": err.message});
            return;
        }
        else {
            let postId = rows[0][0].value; // Inserted id
            res.status(200).json({postId: postId});
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
});


// Listen for requests
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT.toString());
});