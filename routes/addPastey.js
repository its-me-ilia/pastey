const express = require('express');
const router = express.Router();
const { Pastey } = require('../database').models
const shortid = require('shortid');
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
router.post('/', async (req,res)=>{
    try{
        const {title,body,expiration} = req.body;
        console.log(req.body.visibility)
        const visibility = (req.body.visibility === 'true')
        if(body.trim().length < 1){
            return res.status(409).send({
                message: 'მიუთითეთ ფეისთი'
            })
        }
        if(expiration !== 'permanent' && expiration !== "0.4" && expiration !== "7" && expiration !== "31"){
            return res.status(409).send({
                message: 'მიუთითეთ გაუქმების ვადა'
            })
        }
        //visibility gaaswore
        if(req.body.visibility !== 'true' && req.body.visibility !== 'false'){
            return res.status(409).send({
                message: 'მიუთითეთ ვალიდური მნიშვნელობა უნდა იყოს თუ არა ფეისთი საჯარო'
            })
        }
        if(typeof visibility !== 'boolean'){
            return res.status(409).send({
                message: 'მიუთითეთ გსურთ თუ არა რომ ფეისთი იყოს საჯარო'
            })
        }
        if(Buffer.from(body).length > 100000){
            return res.status(409).send({
                message: 'ფეისთის ზომა არ უნდა აღემატებოდეს 100 კილობაიტს'
            })
        }
        const realTitle = title || "Untitled";
        const code = shortid();
        const getDate = (date, currentTime) =>{
            console.log(`fuck ${date}`)
            const datesInMs = date * 24 * 60 * 60 * 1000;
            const _expiry = currentTime + datesInMs
            return _expiry
        }
        console.log(getDate(expiration, new Date().getTime()));
        const pasteyFileStream = fs.createWriteStream(path.resolve(__dirname, '..', 'pasteys', `${code}.txt`));
        pasteyFileStream.write(body, 'utf8');
        pasteyFileStream.end()
        const pastey = await Pastey.create({
            title: realTitle,
            expires: expiration === 'permanent' ? null : getDate(expiration, new Date().getTime()),
            visibility,
            body,
            code
        })
        return res.status(200).send({
            code: pastey.code
        })
    }catch(err){
         res.status(500).send({
            message: err.message
        })
    }
})

module.exports = router;