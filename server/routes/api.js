const express = require('express');
const router = express.Router();

const Ninja = require('../models/ninja');

//get all the names
router.get('/ninjas', (req, res, next) => {

    if(req.query.lat){
        Ninja.geoNear({type:"Point", 
            coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
            {maxDistance:100000, spherical:true}).then((ninjas) => {
                res.send(ninjas);
            }).catch(next);
    }else{
        Ninja.find().then((ninjas) => {
                res.send(ninjas);
            }); 
    }
});

//get record by id
router.get('/ninjas/:id', (req, res, next) => {
    Ninja.findById(req.params.id).then((ninja)=> {
        res.send(ninja);
    }).catch(next);
});

// add a new record
router.post('/ninjas', (req, res, next) => {
   Ninja.create(req.body).then((ninja) => {
        res.send(ninja);
   }).catch(next);
});

//update a record
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({"_id":req.params.id}, req.body).then(()=> {
        Ninja.findOne({"_id": req.params.id}).then((ninja) => {
            res.send(ninja);
        }).catch(next);
    }).catch(next);
});

//remove a record from the db
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({"_id": req.params.id}).then((ninja) => {
        res.send(ninja);
    }).catch(next);
});

module.exports = router;