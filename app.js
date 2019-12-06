const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(compression());
app.use(cors());
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.use('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
    })
}
app.use(helmet());
app.use(helmet.hidePoweredBy({
    setTo: 'Your Support <3'
}));
app.use(require('./routes'));

module.exports = app;