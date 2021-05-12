const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USERPASS}@cluster0.0wqac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use( express.json() );


const port = 5000;



// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USERPASS}@cluster0.0wqac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USERPASS}@cluster0.0wqac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const uri = "mongodb+srv://AdminOfBloodSite:Blood-Site-Admin$12@cluster0.0wqac.mongodb.net/bloodSite?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

client.connect(err => {

  const appointmentCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.COLLECTION_ONE}`);
  const volunteerCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.COLLECTION_TWO}`);
  

  app.post('/addAppointment', (req, res) => {
      const newAppointment = req.body;
      console.log(req.body);
      appointmentCollection.insertOne(newAppointment)
      .then(result => {
          res.sendStatus(result.insertedCount);
          // console.log(result);
      })
  });

  app.post('/addVolunteer', (req, res) => {
      const newVolunteer = req.body;
      console.log(req.body);
      volunteerCollection.insertOne(newVolunteer)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
  });

  app.get('/getAllAppointment', (req, res) => {
      // console.log(req.body);
      appointmentCollection.find({})
      .toArray((error, documents) => {
          res.send(documents);
      })
  });

  app.get('/getAllVolunteer', (req, res) => {
    // console.log(req.body);
    volunteerCollection.find({email: req.query.email})
    .toArray((error, documents) => {
      res.send(documents);
      
    })
  });

});

app.get('/', (req, res) => {
  res.send('Hello from Blood Site');
})

app.listen(port);