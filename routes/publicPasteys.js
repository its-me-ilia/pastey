const express = require('express');
const router = express.Router();
const {
    Pastey
} = require('../database').models;
router.get('/', async (req, res) => {
    try {
        console.log(typeof req.query.page === 'string')
        console.log(req.query.page)
        const page = req.query.page || 1;
        console.log(typeof page === 'string')
        const number = /^[0-9]+$/;
        if(!number.test(page)){
            return res.status(409).send({
                message: 'გვერდი უნდა იყოს დადებითი რიცხვი'
            })
        }
        if(parseInt(page) <= 0){
            return res.status(409).send({
                message: 'გვერდი უნდა იყოს დადებითი რიცხვი'
            })
        }
        const limit = 5;
        const pasteysQuantity = await Pastey.find({
            visibility: true,
            $or: [{expires: {$gt: new Date().getTime()}}, {expires: null}]
        }).countDocuments()
        Pastey.find({
               visibility: true,  
                $or: [{expires: {$gt: new Date().getTime()}}, {expires: null}]
            })
            .skip((page * limit) - limit)
            .limit(limit)
            .exec((err,pasteys)=>{
                if(err){
                    return res.shstatus(500).send({
                        message: err.message
                    })
                }
                res.status(200).send({
                    totalPages: Math.ceil(pasteysQuantity / limit),
                    currentPage: parseInt(page),
                    pasteys
                })
            })
    } catch (err) {
        console.log('error caught')
        return res.status(500).send({
            message: err.message
        })
    }
})

module.exports = router;