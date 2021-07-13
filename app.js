const { urlencoded } = require('express');
const express = require('express')
const path = require('path');
const { title } = require('process');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const port = 80;

// Mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phno: String,
    address: String,
    more: String
  });

  const Contact = mongoose.model('Contact', contactSchema);


//EXPRES STUFF

app.use('/static',express.static('static')); // for serving static files 
app.use(express.urlencoded());

// PUG SPECIFIC STUFF

app.set('view engine','pug'); // setting the templet engine as pug 
app.set('views',path.join(__dirname,'views')); // set the views directory 

// OUR PUG END POINTS

app.get("/",(req,res)=>{
    
    const prams = {  };
    res.status(200).render('home.pug',prams);
});
app.get("/contact",(req,res)=>{
    
    const prams = {  };
    res.status(200).render('contact.pug',prams);
});

app.post("/contact",(req,res)=>{
    
    var mydata = new Contact(req.body);
    mydata.save().then(() =>{
        req.send('This item has been saved to the database')
    }).catch(()=>{
        req.status(400).send('item was not saved to the database')
    });
    // res.status(200).render('contact.pug',prams);
});

// LISTENING OUR APP
app.listen(port,()=>{

    console.log(`application started sucessfully on port ${port}`);
})
