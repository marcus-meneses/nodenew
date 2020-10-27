require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true } );
const db = mongoose.connection;

db.on('error', (error) => console.log(error) );
db.once('open', ()=> console.log('Mongodb Connected')) ;

app.use(express.json());

const authRouter = require('./routes/auth');
const commonRouter = require('./routes/common');

app.use('/auth', authRouter);
app.use('/common', commonRouter);


const port = process.env.NODE_ENVIRONMENT === 'production' ? 80 : 3000;
app.listen(port, ( )=> console.log(`Server Online @ localhost:${port}`) );