const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Search = require('./Models/search')

const app = express();

mongoose
.connect('mongodb+srv://Rudresh:' +
 process.env.MONGO_PASS + 
 '@profiler-nwgfr.mongodb.net/test?retryWrites=true&w=majority',
 { useUnifiedTopology: true, useNewUrlParser: true }
 );

app.use(bodyParser.urlencoded({extended: false}));

app.get('/getData', (req, res, next) => {
    Search.
    find({}).
    then(result => {
        console.log(result);
        res.send(result[0].name)
    }).
    catch(err => {
        console.log(err);
    })
});

app.get('/search', (req, res, next) => {
    res.send('<form action="/result" method="POST"><input type="text" name="Search"><button type="submit">Search Query</button></form>')
})

app.post('/result', (req, res, next) => {
    const search = new Search({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.Search
    })
    search
    .save()
    .then(result => {
        console.log(result);
        res.send('<h3>Successful Query</h3>');
    })
    .catch(err => {
        console.log(err);
    })
    console.log(req.body.Search);
}) 

app.use('/', (req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1');
})

app.listen(3000);