const express = require('express');
const router = express.Router();
const { Pastey } = require('../database').models;
router.get('/', async (req,res) => {
    try{
       // expired ar unda iyos
       let pasteys = await Pastey.find({visibility: true, $or: [{expires: {$gt: new Date().getTime()}}, {expires: null}]}).limit(5);
       return res.status(200).json({
           pasteys: pasteys
       })
    }catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
})

module.exports = router
