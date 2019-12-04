const express = require('express');
const router = express.Router();
const { Pastey } = require('../database').models
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const {createTransport} = require('nodemailer')

router.get('/:code', async (req,res) => {
    try{
        const { code } = req.params;
        const pastey = await Pastey.findOne({code, visibility: true , $or:[{expires: {$gt: new Date().getTime()}}, {expires: null}]});
        if(!pastey){
            return res.status(404).send({
                message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
            })
        }
        return res.status(200).send({
            pastey
        })
    }catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
})

router.get('/:code/download', async (req,res)=>{
    try{
        const pastey = await Pastey.findOne({code: req.params.code, visibility: true});
        if(!pastey){
            return res.status(404).send({
                message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
            })    
        }
        const unlink = promisify(fs.unlink);
        if(pastey.expires < new Date().getTime() && pastey.expires !== null){
            unlink(path.resolve(__dirname, '..', 'pasteys', `${pastey.code}.txt`));
            return res.status(404).send({
                message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
            })
        }
        
        const filePath = path.resolve(__dirname, '..', 'pasteys', `${pastey.code}.txt`);
        fs.access(filePath, (err)=>{
            if(err){
                return res.status(404).send({
                    message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
                })
            }
        })
        return res.status(200).download(filePath)
    }catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
})

router.post('/:code/print-redir', async (req,res) => {
    try{
        const pastey = await Pastey.findOne({code: req.params.code, visibility: true, $or:[{expires: {$gt: new Date().getTime()}}, {expires: null}]});
        if(!pastey){
            return res.status(404).send({
                message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
            })    
        }
        return res.status(200).send({
            location: `/${pastey.code}/print`
        })
    }catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
})

router.get('/:code/print', async (req,res) => {
    try{
        const pastey = await Pastey.findOne({code: req.params.code, visibility: true, $or:[{expires: {$gt: new Date().getTime()}}, {expires: null}]});
        if(!pastey){
            return res.status(404).send({
                message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
            })    
        }
        return res.status(200).send({
            pastey
        })
    }catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
})

router.get('/:code/raw-redir', async (req,res) => {
    try{
        const pastey = await Pastey.findOne({code: req.params.code, visibility: true,$or:[{expires: {$gt: new Date().getTime()}}, {expires: null}]});
        if(!pastey){
            return res.status(404).send({
                message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
            })
        }
        return res.status(200).send({
            location: `/${pastey.code}/raw`
        })
    }catch(err){
        return res.status(500)
    }
})

router.get('/:code/raw', async (req,res) => {
    try{
        const pastey = await Pastey.findOne({code: req.params.code, visibility: true, $or:[{expires: {$gt: new Date().getTime()}}, {expires: null}]});
        if(!pastey){
            return res.status(404).send({
                message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
            })
        }
        return res.status(200).send({
            pastey
        })
    }catch(err){
        return res.status(500)
    }
})

router.post('/:code/report', async (req,res) => {
    try{
        const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
        const {subject, report, sender} = req.body;
        const pastey = await Pastey.findOne({code: req.params.code, visibility: true,$or:[{expires: {$gt: new Date().getTime()}}, {expires: null}]});
        if(!pastey){
            return res.status(404).send({
                message: 'ფეისთი ამ კოდით ვერ მოიძებნა'
            })
        }
        if(sender.trim().length < 1){
            return res.status(409).send({
                message: 'მიუთითეთ გამომგზავნის იმეილი'
            })
        }
        if(!emailRegEx.test(sender)){
            return res.status(409).send({
                message: 'გამოიყენეთ სხვა ელექტრონული ფოსტა'
            })
        }
        if(subject.trim().length < 1){
            return res.status(409).send({
                message: 'მიუითეთ საგანი'
            })
        }
        if(report.trim().length < 1){
            return res.status(409).send({
                message: 'მიუთითეთ მეილი'
            })
        }

        const transport = await createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            port: false,
            requireTLS: true,
            auth: {
                user: '<EMAIL>',
                pass: '<PASSWORD>'
                
            }
        });
        await transport.sendMail({
            from: sender,
            to: 'its.me.ilia04@gmail.com',
            subject,
            text: report
        })
        return res.status(200).send({
            successMessage: 'თქვენი რეპორტი წარმატებით გამოიგზავნა ჩვენთან, ვეცდებით მაქსიმალურად სწრაფად განვიხილოთ და დაგიბრუნდეთ პასუხით. მადლობ, რომ სარგებლობთ ჩვენი სერვისით'
        })
    }catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
})

module.exports = router