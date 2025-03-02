const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

console.log("Hello World");

const games = require('./routes/games');
const publishers = require('./routes/publishers')
app.use('/games', games);
app.use('/publishers', publishers)

require('dotenv').config();
const dbConnData = {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || '',
    username: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASS || ''
};

const mongoose = require('mongoose');

mongoose
    .connect(`mongodb://${dbConnData.username && dbConnData.password ? dbConnData.username + ':' + dbConnData.password + '@' : ''}${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`)
    .then(response => {
        console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
        const apiPort = process.env.PORT || 5000
        const apiHost = process.env.API_HOST || 'localhost';
        app.listen(apiPort, () => {
            console.log(`API server available from: http://${apiHost}:${apiPort}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB', error));

module.exports = app;
