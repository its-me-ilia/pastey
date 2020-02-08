require('dotenv').config({
    path: '../.env'
});
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); //install bluebird first
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=>{
    console.log('connection to db eshtablished');
})
.catch(err => {
    console.log(`DB ERROR: ${err.message}`)
    process.exit(-1)
})

const schemas = require('./schemas');
const models = {};

for(let schemaName in schemas){
    models[schemaName] = mongoose.model(schemaName, schemas[schemaName])
    console.log(models[schemaName])
}
module.exports = {
    connection: mongoose.connection,
    models: models
}

