var express = require('express');
var router = express.Router();

var Lab = require('../models/labs');
var Objective = require('../models/objectives');
var auth = require('index.js');

router.get('/title/:title', function(req, res){
    Objective.find().sort('-_id')
        .then(function (doc) {
            res.render('labsAdmin', { output: req.params.title, items: doc});
        });
    //res.render('labs1', {output: req.params.title}); //get the title passed in the parameter(:title)
                                                     // to use it in the labs1.handlebars

});

router.get('/stuff', function(req, res){
    console.log(req.query);
    //http://localhost:3000/lab/stuff?title=LOrna&name=lynn
    //{ title: 'LOrna', name: 'lynn' }
});

router.post('/addExperiment', function(req, res, next){
    var item = {
        title: req.body.title,
        category: req.body.category,
        url: req.body.url
    };

    var lab = new Lab(item); //instance of the model
    lab.save();

    res.redirect('/');
});

router.post('/delete', function(req, res, next){
    var id = req.body.lab;
    Lab.findByIdAndRemove(id).exec();

    res.redirect('/');
});

router.post('/details', function(req, res, next) {

    var id = req.body.lab;
    //console.log(id);

    Lab.findById(id, function (err, doc) {
        if (err){
            console.log('No entry found');
        } else {
            res.render('editExperiment', { doc: doc});
        }
    });
});

router.post('/update', function(req, res, next) {

    var id = req.body.lab;

    Lab.findById(id, function (err, doc) {
        if (err){
            console.log('No entry found');
        }
        doc.title = req.body.title;
        doc.category = req.body.category;
        doc.url = req.body.url;
        doc.save();
    });
    res.redirect('/');
});

module.exports = router;