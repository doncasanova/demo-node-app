require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);
//mongoose.connect('mongodb://someuser:abcd1234@ds131954.mlab.com:31954/sp-node-article');
mongoose.Promise = global.Promise;
mongoose.connection
    .on('connected', () => {
        console.log(`Mongoose connection open on ${process.env.DATABASE}`);
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });

require('./models/Registration');

const app = require('./app');


const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});