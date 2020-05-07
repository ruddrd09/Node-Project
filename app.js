const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Search = require('./models/search')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

mongoose
.connect('mongodb+srv://Rudresh:' +
 process.env.MONGO_PASS + 
 '@profiler-nwgfr.mongodb.net/test?retryWrites=true&w=majority',
 { useUnifiedTopology: true, useNewUrlParser: true }
 );

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
    res.status(200).render('home', {title: 'Node Application'});
})

app.post('/getData', (req, res, next) => {
    Search.
    find({name: req.body.Search}).
    then(result => {
        console.log(result);
        res.status(200).render('result', {title: result});
    }).
    catch(err => {
        console.log(err);
    })
    console.log(req.body.Search);
});

app.get('/getData/:name', (req, res, next) => {
    Search.
    find({name: req.params.name}).
    then(result => {
        console.log(result);
        res.status(200).render('result', {title: result});
    }).
    catch(err => {
        console.log(err);
    })
});

app.get('/addProfile', (req, res, next) => {
    res.status(200).render('add-profile', {title: 'Node Application'});
})

app.post('/addition', (req, res, next) => {
    const search = new Search({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.title
    }, { versionKey: false });
    search
    .save()
    .then(result => {
        console.log(result);
        res.redirect('/addProfile');
    })
    .catch(err => {
        console.log(err);
    })
    console.log(req.body.title);
}) 

app.use((req, res, next) => {
    res.status(200).render('404', {title: 'Node Application'});
});

app.listen(3000);
