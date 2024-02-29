// trying to communicate with my databse using express and mongoose
const express = require('express');
const mongoose = require('mongoose');

// Function to establish a connection to MongoDB
export async function connectToMongo() {

  const app = express();

  // select appropriate database properties
  const port = 27017;
  const dbName = 'PongScoreTable';
  const uri = `mongodb://localhost:${port}/${dbName}`;
  const collectionName = 'playerScores';

  try {

    // connect to db 
    await mongoose.connect(`mongodb://localhost:${port}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // when sucessfuly Connected
    console.log('Connected to the database successfully');

    // setup routes for handling a request
    app.get(`/${collectionName}`, (req, res) => {
      res.json({message: `Get all ${collectionName}`});
    });

    // start express server
    const server = app.listen(3000, () => {
      console.log('Express server listening on port 3000');
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error('Express server error:', error);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

}


