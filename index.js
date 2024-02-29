const express = require('express');
const mongoose = require('mongoose');
const app = express();
const tipsRouter = require('./router/tipRoute');
const teamsRouter = require('./router/teamRoute');
require('dotenv').config(); 

const mongoURI = process.env.MONGO_URL;
const PORT = process.env.PORT;

app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.get('/',(req,res)=> {
    res.json("I'm currently available....")
})

// Routes
app.use('/tips', tipsRouter);
app.use('/teams', teamsRouter);

app.listen(PORT, () => console.log('Server Started'));
