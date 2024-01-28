const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const UserRoutes=require('./src/routes/user');

//app.use(session({secret:'my secret',resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', UserRoutes);

app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message= error.message;
    const data =error.data;
    res.status(status).json({message:message, data:data});

});


app.listen(3000);
