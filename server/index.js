var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


const routes = require('./routes/api');

mongoose.connect('mongodb://mongo/ninjas');

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const PORT = 9000;
const app = express();


app.get('/', (req, res) => {
    res.send('Its working.. and i can make changes as well ');
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())
app.use('/api/v1', routes);
app.use((err, req, res, next) => {
    //console.log(err);
    res.status(422).send({ "error": err.message});
});



app.listen(PORT);
console.log('server started...');
console.log('listening on post 9000');